import { Inject } from "@nestjs/common";
import { IPropertyRepository, PropertyWithImages } from "../../core/domain/property.interface";
import { Pool } from "pg";
import { QueryBuilder } from "../helper/queryBuilder.helper";
import { Property } from "../../core/entity/property.entity";
import { Exception } from "../services/exception.service";
import { PropertyImage } from "../../core/entity/propertyImages.entity";

export class SqlPropertyRepository implements IPropertyRepository {
  constructor(
    private readonly queryBuilder: QueryBuilder,
    private readonly exception: Exception,
    @Inject('PG_CONNECTION') private readonly conn: Pool
  ) { }

  private mapProperty(row: any): Property {
    return new Property(
      row.property_address,
      row.property_status_id,
      row.property_service_id,
      row.property_type_id,
      row.bath_quantity,
      row.room_quantity,
      row.electricity_service || null,
      row.water_service || null,
      row.internet_service || null,
      row.property_id
    );
  }

  private mapImage(row: any): PropertyImage | null {
    if (!row.image_url) return null;

    return new PropertyImage(
      row.image_url,
      row.image_name,
      row.image_order
    );
}

  async findAll(): Promise<PropertyWithImages[] | null> {
    const queryFindAll = `
      SELECT 
        p.property_id,
        p.property_address,
        p.property_status_id,
        p.property_service_id,
        p.property_type_id,
        dp.bath_quantity,
        dp.room_quantity,
      COALESCE(
        json_agg(
              json_build_object(
              'image_url', ip.image_url,
              'image_name', ip.image_name,
              'image_order', ip.image_order
              )
            ) FILTER (WHERE ip.image_url IS NOT NULL),
        '[]'
      ) AS images
      FROM property p
      JOIN detail dp
        ON p.property_id = dp.property_id
      LEFT JOIN property_image ip
        ON p.property_id = ip.property_id
        AND ip.image_order = 1
	    GROUP BY
	      p.property_id,
	      p.property_address,
	      p.property_status_id,
	      p.property_service_id,
	      p.property_type_id,
	      dp.bath_quantity,
	      dp.room_quantity`;

    try {
      const { rows } = await this.conn.query(queryFindAll);
      return rows.map(row => ({
        property: this.mapProperty(row),
        propertyImage: row.images.map((image: any) => this.mapImage(image))
      }));
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async create(property: Property, images: PropertyImage[]): Promise<Property | null> {
    const queryCreateProperty = `
      INSERT INTO property(property_id, property_address, property_status_id, property_service_id, property_type_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const queryCreateDetails = `
      INSERT INTO detail(bath_quantity, room_quantity, electricity_service, water_service, internet_service, property_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `

    const queryInsertImages = `
      INSERT INTO property_image(image_url, image_name, image_order, property_id)
      VALUES($1, $2, $3, $4)
    `
    const client = await this.conn.connect();
    try {
      await client.query('BEGIN');
      const { rows: rowsCreate } = await this.conn.query(queryCreateProperty, [
        property.getId(),
        property.getAddress(),
        property.getStatusId(),
        property.getServiceId(),
        property.getTypeId()
      ]);
      const { rows: rowsDetails } = await client.query(queryCreateDetails, [
        property.getBathQuantity(),
        property.getRoomQuantity(),
        property.getElectricityService(),
        property.getWaterService(),
        property.getInternetService(),
        property.getId()
      ]);

      for (const image of images) {
        await client.query(queryInsertImages, [
          image.getUrlImage(),
          image.getNameImage(),
          image.getOrderImage(),
          property.getId()
        ])
      }

      await client.query('COMMIT')

      const combinedRow = {
        ...rowsCreate[0],
        ...rowsDetails[0],
      }

      const mappedProperty = this.mapProperty(combinedRow);
      return mappedProperty
    } catch (err: any) {
      console.error('err', err);
      await client.query('ROLLBACK')
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    } finally {
      await client.release()
    }
  }

  async findById(id: string): Promise<Property | null> {
    const queryFindById = `
      SELECT 
        p.property_id,
        p.property_address,
        p.property_status_id,
        p.property_service_id,
        p.property_type_id,
        dp.bath_quantity,
        dp.room_quantity,
        dp.electricity_service,
        dp.water_service,
        dp.internet_service
      FROM property p
      JOIN details dp
        ON p.property_id = dp.property_id
      WHERE p.property_id = $1
    `
    try {
      const { rows } = await this.conn.query(queryFindById, [id]);
      return this.mapProperty(rows);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async delete(id: string): Promise<number | null> {
    const queryDelete = `
      DELETE FROM property
      WHERE property_id = $1
    `
    try {
      const { rowCount } = await this.conn.query(queryDelete, [id]);
      return rowCount;
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async update(property: Property): Promise<Property | null> {
    const queryUpdate = `
      UPDATE property 
      SET 
    `;
    try {
      const { rows } = await this.conn.query(queryUpdate, [property]);
      return this.mapProperty(rows);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

}

