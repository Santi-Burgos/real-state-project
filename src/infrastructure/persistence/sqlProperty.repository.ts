import { Inject } from "@nestjs/common";
import { IPropertyRepository } from "../../core/domain/property.interface";
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

  private mapToEntity(row: any): Property | null {
    if (!row) return null;

    return new Property(
      row.property_address,
      row.property_status_id,
      row.property_service_id,
      row.property_type_id,
      row.bath_quantity,
      row.room_quantity,
      row.electricity_service,
      row.water_service,
      row.internet_service,
      row.property_id
    );
  }

  async findAll(): Promise<Property[]> {
    const queryFindAll = `
      SELECT 
        p.property_id
        p.property_address,
        p.property_status_id,
        p.property_service_id,
        p.property_type_id,
        dp.bath_quantity,
        dp.room_quantity,
        dp.electricity_service,
        dp.water_service,
        dp.internet_service,
      FROM property p
      JOIN details dp
        ON p.property_id = dp.property_id
    `;
    try {
      const { rows } = await this.conn.query(queryFindAll);
      return rows.map((row) => this.mapToEntity(row))
        .filter((property): property is Property => property !== null);
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

      const mappedProperty = this.mapToEntity(combinedRow);
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
        p.property_id
        p.property_address,
        p.property_status_id,
        p.property_service_id,
        p.property_type_id,
        dp.bath_quantity,
        dp.room_quantity,
        dp.electricity_service,
        dp.water_service,
        dp.internet_service,
      FROM property p
      JOIN details dp
        ON p.property_id = dp.property_id
      WHERE p.property_id = $1
    `
    try {
      const { rows } = await this.conn.query(queryFindById, [id]);
      return this.mapToEntity(rows);
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
      return this.mapToEntity(rows);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

}

