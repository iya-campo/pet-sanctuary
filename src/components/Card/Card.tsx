import { CardContent, CardMedia, Typography, CardProps } from '@mui/material';
import { StyledCard } from './Card.styles';

interface CustomCardProps extends CardProps {
  title: string;
  description?: string;
  image?: string;
}

export const Card = ({ title, description, image, ...props }: CustomCardProps) => {
  return (
    <StyledCard {...props}>
      {image && <CardMedia component="img" image={image} alt={title} />}
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </StyledCard>
  );
};