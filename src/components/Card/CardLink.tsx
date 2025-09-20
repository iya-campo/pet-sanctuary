import React from 'react'
import Link from 'next/link';
import { ArrowRight } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { StyledCard } from './Card.styles';

export interface CardLinkProps {
    title: string;
    href: string;
    img?: string;
}

const CardLink = ({ title, href, img, ...props }: CardLinkProps) => {
  return (
    <Link href={href} passHref style={{ flex: '45%' }}>
      <StyledCard variant='outlined' {...props}>
        <Stack direction='row' justifyContent='center' alignItems='center' pt={6}>
            <Typography variant='h5' display='inline'>{title}</Typography>
            <ArrowRight />
        </Stack>
      </StyledCard>
    </Link>
  )
}

export default CardLink