import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Product')
@Controller('product')
// @UseGuards(JwtAuthGuard) : apply the guard to all the routes
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('bulk')
  createBulk() {
    return this.productService.bulkCreate();
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
    @Query('q') query: string,
    @Query('minP') minPrice: number,
    @Query('maxP') maxPrice: number,
    @Query('idOrder') idOrder: string = 'ASC' || 'DESC',
    @Query('priceOrder') priceOrder: string = 'ASC' || 'DESC',
  
  ) {
    return this.productService.findAll(page, size, query,  minPrice, maxPrice, idOrder, priceOrder);
  }

  @Get('search')
  findByQuery(@Query('q') query: string) {
    return this.productService.fingByQuery(query);
  }

  @Get("filter")
  filterByPrice(@Query("min") minPrice: number, @Query("max") maxPrice: number) {
    return this.productService.filterByPrice(minPrice, maxPrice);
  }

  @Get("sort")
  sortByField(@Query("field") field: string, @Query("order") order: string) {
    console.log(field, order);
    return this.productService.sort(field, order);
  }

  @ApiNotFoundResponse({ description: 'No data is found for the specified ID' })
  @ApiOkResponse({ description: 'Product Data found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
