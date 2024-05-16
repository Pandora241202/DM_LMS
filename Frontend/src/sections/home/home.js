import NextLink from 'next/link';
import { paths } from '../../paths';
import { Box, Button, Container, Rating, Stack, SvgIcon, Typography, Divider, Grid  } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Home = () =>{
    const theme = useTheme();

    return (
        <Grid
            container
        >
            <Grid
                item 
                xl = {8}
                xs = {12}   
                sx = {{
                    position: 'absolute',
                    top: '20%',
                    fontSize: '150px',
                    textAlign: 'center'
                }}
            >
                AI LEARNING SYSTEM
            </Grid>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx = {{
                    position: 'absolute',
                    top: { md: '80%', lg: '40%' },
                    right: { md: '5%', lg: '10%' },
                    height: '80px',
                    width: '600px'
                }}
            >
                <Button
                    component={NextLink}
                    href={paths.usedAuth.jwt.register}
                    sx={
                        (theme) => 
                            theme.palette.mode === 'dark'
                            ? {
                                backgroundColor: 'neutral.50',
                                color: 'neutral.900',
                                '&:hover': {
                                backgroundColor: 'neutral.200'
                                }
                            }
                            : {
                                backgroundColor: 'neutral.900',
                                color: 'neutral.50',
                                '&:hover': {
                                backgroundColor: 'neutral.700'
                                }
                            }
                    }
                    style = {{
                        width: '50%',
                        fontSize: '18px'
                    }}
                    variant="contained"
                >
                    Sign up
                </Button>

                <Button
                    component={NextLink}
                    href={paths.usedAuth.jwt.login}
                    sx={(theme) => theme.palette.mode === 'dark'
                    ? {
                        backgroundColor: 'neutral.50',
                        color: 'neutral.900',
                        '&:hover': {
                        backgroundColor: 'neutral.200'
                        }
                    }
                    : {
                        backgroundColor: 'neutral.900',
                        color: 'neutral.50',
                        '&:hover': {
                        backgroundColor: 'neutral.700'
                        }
                    }}
                    style = {{
                        width: '50%',
                        fontSize: '18px'
                    }}
                    variant="contained"
                >
                    Sign in
                </Button>
            </Stack>
        </Grid>
    );
}
