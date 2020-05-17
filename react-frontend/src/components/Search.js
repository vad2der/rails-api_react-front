import React from 'react';
import { TextField, Button, Icon, FormControl } from '@material-ui/core';
import dataservice from '../services/DataService';
import { productsService } from '../services/ProductService';

import './Search.css'

const departments = [
  {
    value: '..,',
    label: 'All',
  },
  {
    value: 'Houshold',
    label: 'Houshold',
  },
  {
    value: 'Deli',
    label: 'Deli',
  },
  {
    value: 'Apparel',
    label: 'Apparel',
  },
];

const pageSizes = [
  {
    value: 5,
    label: 5
  },
  {
    value: 10,
    label: 10
  },
  {
    value: 15,
    label: 15
  },
];

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        products: [],
        promocode: '',
        search: '',
        page: 1,
        pageSize: 10,
        department: departments[0].value
    }
  }

  componentDidMount() {
    this.requestProducts(this.state.pageSize, this.state.page, this.state.department, this.state.promocode, this.state.search);
  }

  componentWillUnmount() {
    
  }

  handleDepartmentChange = (event) => {
    this.setState({department: event.target.value, page: 1});
    this.requestProducts(this.state.pageSize, 1, event.target.value, this.state.promocode, this.state.search);
  }

  handlePageSizeChange = (event) => {
    this.setState({pageSize: event.target.value});
    this.requestProducts(event.target.value, this.state.page, this.state.department, this.state.promocode, this.state.search);
  }

  changePage = (newPage) => {
    this.setState({page: newPage});
    this.requestProducts(this.state.pageSize, newPage, this.state.department, this.state.promocode, this.state.search);
  }

  searchPromoCode = (code) => {
    this.setState({promocode: code, page: 1, search: ''});
    this.requestProducts(this.state.pageSize, 1, this.state.department, code, this.state.search);
  }

  searchByName = (searchText) => {
    this.setState({promocode: '', page: 1, search: searchText});
    this.requestProducts(this.state.pageSize, 1, this.state.department, this.state.promocode, searchText);
  }

  requestProducts(pagesize=this.state.pageSize, page=this.state.page, department=this.state.department, promocode=this.state.promocode, search=this.state.search) {
    if (department === '...') {department = ''};
    dataservice.get('/api/v1/products?size=' + pagesize +
                                     '&page=' + page +
                                     '&department=' + department +
                                     '&promocode=' + promocode +
                                     '&search=' + search, {
        headers: {}
    }).then((resp) => {
      this.setState({products: resp.data});
      productsService.setProducts(resp);
    }).catch((err) => {
      console.log(err);
    });
  }

  renderPageLeft() {
    if (this.state.page === 1) {
      return <Button className='btn' variant="contained" disabled><Icon>chevron_left</Icon></Button>
    } else {
      return <Button className='btn' variant="contained" onClick={() => {this.changePage(this.state.page - 1)}}><Icon>chevron_left</Icon></Button>
    }
  }

  renderPageRight() {
    if (this.state.pageSize > this.state.products.length) {
      return <Button className='btn' variant="contained" disabled ><Icon>chevron_right</Icon></Button>
    } else {
      return <Button className='btn' variant="contained" onClick={() => {this.changePage(this.state.page + 1)}}><Icon>chevron_right</Icon></Button>
    }
  }

  changePromoCodeSearch = (event) => {
      const value = event.target.value;
      this.setState({promocode: value});
  }

  changeTextSearch = (event) => {
    const value = event.target.value;
    this.setState({search: value});
  }

  renderPromoSearchBtn = () => {
    if (this.state.promocode.length > 0) {
      return <Button className='btn' variant="contained" onClick={() => {this.searchPromoCode(this.state.promocode)}}><Icon>check</Icon></Button>
    } else {
      return <Button className='btn' variant="contained" disabled><Icon>check</Icon></Button>
    }
  }

  renderTextSearchBtn = () => {
    if (this.state.search.length > 0) {
      return <Button className='btn' variant="contained" onClick={() => {this.searchByName(this.state.search)}}><Icon>search</Icon></Button>
    } else {
      return <Button className='btn' variant="contained" disabled><Icon>search</Icon></Button>
    }
  }

  clearProductSearch = () => {
    this.setState({
      promocode: '',
      search: '',
      page: 1,
      pageSize: 10,
      department: departments[0].value
    });
  }

  renderClearBtn () {
    if (this.state.products.length === 0) {
      return <Button className='btn' variant='contained' onClick={() => {this.requestProducts()}}>Load Products</Button>
    } else {
      return <Button className='btn' variant='contained' onClick={() => {this.clearProductSearch()}}>Clear</Button>
    }
  }

  render() {
    return (
      // <FormControl onSubmit={()=>{this.requestProducts()}}>
        <div className="search">
        
          <span id="departments">
            <TextField
              
              select
              label="Department"
              value={this.state.department}
              onChange={this.handleDepartmentChange}
              SelectProps={{
                native: true,
              }}
              helperText="Select department"
            >
              {departments.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </span>

          <span id="promocode">
            <TextField
              label="Promocode"
              value={this.state.promocode}
              onChange={this.changePromoCodeSearch}
            />
            {this.renderPromoSearchBtn()}
          </span>
        
          <span id="search">
            <TextField
              label="Search"
              value={this.state.search}
              onChange={this.changeTextSearch}
            />
            {this.renderTextSearchBtn()}
          </span>

          <span id="pagesize">
            <TextField
              
              select
              label="Page size"
              value={this.state.pageSize}
              onChange={this.handlePageSizeChange}
              SelectProps={{
                native: true,
              }}
              helperText="Select page size"
            >
              {pageSizes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </span>

          <span id="page">
            {this.renderPageLeft()}
            {this.state.page}
            {this.renderPageRight()}
          </span>

          <span id="clear">
            {this.renderClearBtn()}
          </span>
        </div>
      // </FormControl>
    );
  }

}

export default Search;