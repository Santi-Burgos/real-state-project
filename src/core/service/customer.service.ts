import { Injectable, Inject } from "@nestjs/common";
import { ICustomerRespository } from "../domain/customer.interface";
import { CustomerReqDTO, CustomerReqUpdateDTO } from "../dto/customerReq.dto";
import { CustomerResDTO } from "../dto/customerRes.dto";
import { Customer } from "../entity/customer.entity";
import { IException } from "../domain/exception.interface";
import { QueryParamDTO } from "../dto/queryParam.dto";

@Injectable()
export class CustomerService{
  constructor(
    @Inject('ICustomerRepository') private readonly customerRepository: ICustomerRespository,
    @Inject('IException') private readonly exception: IException,
  ){ }

  async createCustomer(customerData: CustomerReqDTO ): Promise<CustomerResDTO>{    
    const hasCustomerPhone = await this.customerRepository.findCustomerByPhone(customerData.phone);
    if(hasCustomerPhone != null){
      this.exception.BadRequestException("El numero de telefono ya existe");
    }

    const customer = new Customer(
      customerData.email,
      customerData.phone,
      customerData.customerName,
      customerData.customerType,
      customerData.customerStatusPayment ? customerData.customerStatusPayment : 0
    );

    await this.customerRepository.createCustomer(customer);

    return new CustomerResDTO(customer);
  }

  async updateCustomer(customerId: string, customerData: CustomerReqUpdateDTO): Promise<CustomerResDTO>{
    const customerOnDB = await this.customerRepository.findCustomerById(customerId);
    if(!customerOnDB){
      this.exception.NotFoundException('Usuario no enconrtado');
    }
    customerOnDB.mergeUpdateCustomer(customerData);

    await this.customerRepository.updateCustomer(customerId, customerOnDB);
    
    return new CustomerResDTO(customerOnDB);
  }

  async getAllCustomer(queryParam: QueryParamDTO): Promise<CustomerResDTO[] | []>{
    const allCustomers = await this.customerRepository.findAllCustomer(queryParam);
    if(allCustomers == null){
      return [];
    }

    return allCustomers.map(customer => new CustomerResDTO(customer));
  }

  async getOneCustomer(customerId: string): Promise<CustomerResDTO>{
    const getCustomer = await this.customerRepository.findCustomerById(customerId);
    if(getCustomer == null){
      this.exception.NotFoundException("Usuario no encontrado");
    }

    return new CustomerResDTO(getCustomer);
  }

  async deleteCustomer(customerId: string): Promise<string>{
    const existingCustomer = await this.customerRepository.findCustomerById(customerId);
    if(!existingCustomer){
      this.exception.NotFoundException("Usuario para eliminar no encontrado");
    }

    const rowsAffected = await this.customerRepository.deleteCustomerById(customerId);
    if(rowsAffected == 0){
      this.exception.BadRequestException("Usuario ya eliminado");
    }
    const msg = `Usuario eliminado, han sido removidas ${rowsAffected} filas.`
    return msg;
  }
}