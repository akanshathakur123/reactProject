import React, { useEffect, useState } from 'react'
import { getProducts, getProductsbyId } from '../service/Auth'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { increaseCart } from '../redux/Counter'
import PaginatedItems from '../components/Pagination';

export default function Products() {
  const[proData,setData]=useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    getProducts().then(res=>{
      setData(res.data.prodata)
    })
  },[])

  const addToCart=(id)=>{
    getProductsbyId(id).then(res=>{
        if(res){
            if(localStorage.getItem("product")!=undefined){
                let arr=JSON.parse(localStorage.getItem("product"))
                    if(arr.some(items=>id==items._id)){
                        alert("product already addedd")
                    }
                    else{
                        arr.push(res.data)
                        localStorage.setItem('product',JSON.stringify(arr))
                        alert("product added")
                        dispatch(increaseCart())
                    }
                
              }else{
                let arr=[]
                arr.push(res.data)
                localStorage.setItem('product',JSON.stringify(arr))
                alert("product added")
                dispatch(increaseCart())
            }
        }
    }).catch(err=>{
        console.log(err)
    })
}
  return (
    <Container>
      <h2>Products</h2>
    <Grid container spacing={2}>
    {proData.map(items=>(
      <Grid item xs={4} key={items._id}>
      <Card sx={{ maxWidth: 345,marginTop:"30px" }} >
        <CardMedia
          component="img"
          height="300"
          image={items.imageURL}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {items.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {items.price}/-
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>navigate(`/productsinfo${items._id}`)}>Info</Button>
          <Button size="small" onClick={()=>addToCart(items._id)}>Add to cart</Button>
        </CardActions>
    </Card>
    </Grid>
    ))}
    </Grid>
    <PaginatedItems itemsPerPage={4} />
    </Container>
  )
}
