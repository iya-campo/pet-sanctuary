import { styled } from '@mui/material/styles';
import MUICard from '@mui/material/Card';

export const StyledCard = styled(MUICard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
  minWidth: 345,
  minHeight: 250,
}));