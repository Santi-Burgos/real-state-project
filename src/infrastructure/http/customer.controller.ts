import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Query } from "@nestjs/common";
import { CustomerService } from "../../core/service/customer.service";
import { CustomerReqDTO, CustomerReqUpdateDTO } from "../../core/dto/customerReq.dto";
import { ApiResponse } from "../../core/dto/apiRes.dto";
import { AuthGuard } from "./guards/auth.guard";
import { QueryParamDTO } from "../../core/dto/queryParam.dto";

@UseGuards(AuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  async createCustomer(@Body() createCustomer: CustomerReqDTO) {
    const customer = await this.customerService.createCustomer(createCustomer);
    return ApiResponse.success(customer, "Customer created successfully");
  }

  @Get(':customerId')
  async findCustomerById(@Param('customerId') customerId: string) {
    console.log(customerId);
    const customer = await this.customerService.getOneCustomer(customerId);
    return ApiResponse.success(customer, "Customer found successfully");
  }

  @Patch(':customerId')
  async updateCustomer(@Param('customerId') customerId: string, @Body() updateCustomer: CustomerReqUpdateDTO) {
    const customer = await this.customerService.updateCustomer(customerId, updateCustomer);
    return ApiResponse.success(customer, "Customer updated successfully");
  }

  @Delete(':customerId')
  async deleteCustomer(@Param('customerId') customerId: string) {
    const customer = await this.customerService.deleteCustomer(customerId);
    return ApiResponse.success(customer, "Customer deleted successfully");
  }

  @Get()
  async findAllCustomer(
    @Query() queryParam: QueryParamDTO
  ){
    const customers = await this.customerService.getAllCustomer(queryParam);
    return ApiResponse.success(customers, "Customers found successfully");
  }
}