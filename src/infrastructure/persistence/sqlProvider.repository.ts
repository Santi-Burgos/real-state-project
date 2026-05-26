import { Inject } from "@nestjs/common";
import { IProviderRepository } from "../../core/domain/provider.interface";
import { Exception } from "../services/exception.service";
import { Pool } from "pg";
import { Provider } from "../../core/entity/provider.entity";

export class SqlProviderRepository implements IProviderRepository {
  constructor(
    private readonly exception: Exception,
    @Inject('PG_CONNECTION') private readonly conn: Pool,
  ) { }

  private mapToEntity(row: any): Provider | null {
    if (!row) return null;
    return new Provider(
      row.provider_id,
      row.email,
      row.phone,
      row.provider_name,
      row.providers_service_id
    );
  }

  async create(provider: Provider): Promise<Provider | null> {
    const queryCreate = `
      INSERT INTO provider(provider_id, email, phone, provider_name, providers_service_id) 
      VALUES ($1, $2, $3, $4, $5)`
    try {
      const { rows } = await this.conn.query(queryCreate, [
        provider.getId(),
        provider.getEmail(),
        provider.getPhone(),
        provider.getProviderName(),
        provider.getProviderServiceId()
      ])
      return this.mapToEntity(rows)
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al insertar proveedor")
    }
  }

  async getAllProvider(): Promise<Provider[]> {
    const queryFindAll = `
      SELECT 
        p.provider_id,
        p.email,
        p.phone,
        p.provider_name,
        p.providers_service_id
      FROM providers p;
    `;
    try {
      const { rows } = await this.conn.query(queryFindAll);
      return rows.map((row) => this.mapToEntity(row))
        .filter((provider): provider is Provider => provider !== null);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async delete(id: string): Promise<number | null> {
    const queryDelete = `
      DELETE FROM providers
      WHERE provider_id = $1
    `;
    try {
      const { rowCount } = await this.conn.query(queryDelete, [id]);
      return rowCount;
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async update(provider: Provider): Promise<Provider | null> {
    const queryUpdate = `
      UPDATE providers
      SET email = $1, phone = $2, provider_name = $3, providers_service_id = $4
      WHERE provider_id = $5
    `;
    try {
      const { rows } = await this.conn.query(queryUpdate, [
        provider.getEmail(),
        provider.getPhone(),
        provider.getProviderName(),
        provider.getProviderServiceId(),
        provider.getId()
      ]);
      return this.mapToEntity(rows);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async findProviderById(providerId: string): Promise<Provider | null> {
    const queryFindProviderById = `
      SELECT 
        p.provider_id,
        p.email,
        p.phone,
        p.provider_name,
        p.providers_service_id
      FROM providers p
      WHERE p.provider_id = $1
    `;
    try {
      const { rows } = await this.conn.query(queryFindProviderById, [providerId]);
      return this.mapToEntity(rows);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }
}