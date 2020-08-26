import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
  link : {
    display : 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs({ page, productName }) {
  const classes = useStyles();
  if(page === 'slug'){
    return (
      <div
        className={`breadcrumb-area space-pt--0 space-pb--0`}
        >
      <Breadcrumbs aria-label="breadcrumb">
       
                <Link color="inherit" href="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link color="inherit" href="/" className={classes.link}>
            <MenuBookIcon className={classes.icon} />
            Products
          </Link> 
          <Link color="inherit" className={classes.link}>
            <WhatshotIcon className={classes.icon} />
            {productName}
          </Link>    
       
      </Breadcrumbs>
      </div>
    );
  }
  else if(page === "cart") {
    return (
      <div
        className={`breadcrumb-area space-pt--0 space-pb--0`}
        >
      <Breadcrumbs aria-label="breadcrumb">
       
                <Link color="inherit" href="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link color="inherit" className={classes.link}>
            <AddShoppingCartIcon className={classes.icon} />
            Cart
          </Link>    
       
      </Breadcrumbs>
      </div>
    );
  }
  else if(page === "details") {
    return (
      <div
        className={`breadcrumb-area space-pt--0 space-pb--0`}
        >
      <Breadcrumbs aria-label="breadcrumb">
       
                <Link color="inherit" href="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Link color="inherit"  href="/other/cart" className={classes.link}>
            <AddShoppingCartIcon className={classes.icon} />
            Cart
          </Link>    
          <Link color="inherit" className={classes.link}>
            <EventNoteIcon className={classes.icon} />
            Details
          </Link>  
      </Breadcrumbs>
      </div>
    );
  }
  else {
    return (
      <div
        className={`breadcrumb-area space-pt--0 space-pb--0`}
        style={{}}
        >
      <Breadcrumbs aria-label="breadcrumb">
       
                <Link color="inherit" href="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
                   
       
      </Breadcrumbs>
      </div>
    );
  }
  
}
