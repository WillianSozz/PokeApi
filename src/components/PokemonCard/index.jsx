import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea} from '@mui/material';

export default function PokemonCard({ name, image, types }) {
  const typeHandler = () => {
    if(types[1]){
      return types[0].type.name + " | " + types[1].type.name;
    }
    return types[0].type.name;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" image={image} alt={name}/>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" textAlign="right" >
          <Typography gutterBottom variant="h6" component="div" textAlign="left">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div" >
            {typeHandler()}
          </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}