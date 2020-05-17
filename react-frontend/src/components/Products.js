import React, { useState, useEffect } from 'react';
import { Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { productsService } from '../services/ProductService';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsService.getProducts().subscribe((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Promotion</TableCell>
            <TableCell align="right">Discounted Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{parseFloat(row.price).toFixed(2)}</TableCell>
              <TableCell align="right">{row.promotions.toString()}</TableCell>
              <TableCell align="right">{parseFloat(row.discounted_price).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}