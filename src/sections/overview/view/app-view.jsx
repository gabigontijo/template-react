
import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
 const [filterMonth, setFilterMonth] = useState('Agosto');
 const [filterYear, setFilterYear] = useState(2024);
 const [bestPartners, setBestPartners] = useState([{"partner" : "parceiro 1", "qtt": 10 }, {"partner": "parceiro 2", "qtt": 5}, {"partner": "parceiro 3", "qtt" : 1}])

  const chartData = bestPartners.map(partner => ({
    label: partner.partner,
    value: partner.qtt
  }));

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Relatórios dos empréstimos
      </Typography>

      <Typography variant="h6" sx={{ mb: 5 }}>
        Empréstimos em {filterMonth}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Quantidade de empréstimo"
            total={50}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Valor emprestado"
            total={10000}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Lucro Bruto"
            total={3000}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Lucro líquido"
            total={1500}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Empréstimos"
            subheader={filterYear}
            chart={{
              labels: [
                `01/01/${filterYear}`,
                `02/01/${filterYear}`,
                `03/01/${filterYear}`,
                `04/01/${filterYear}`,
                `05/01/${filterYear}`,
                `06/01/${filterYear}`,
                `07/01/${filterYear}`,
                `08/01/${filterYear}`,
                `09/01/${filterYear}`,
                `10/01/${filterYear}`,
                `11/01/${filterYear}`,
              ],
              series: [
                {
                  name: 'Valor total',
                  type: 'column',
                  fill: 'solid',
                  data: [2300, 1100, 2200, 2700, 1300, 2200, 3700, 2100, 4400, 2200, 3000],
                },
                {
                  name: 'Lucro Bruto',
                  type: 'area',
                  fill: 'gradient',
                  data: [1250, 550, 550, 1100, 1350, 650, 1100, 1750, 1050, 1100, 1500],
                },
                {
                  name: 'Lucro líquido',
                  type: 'line',
                  fill: 'solid',
                  data: [800, 400, 400, 650, 1000, 400, 800, 1200, 850, 800, 1300],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Principais parceiros"
             chart={{
          series: chartData,
        }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}

      </Grid>
    </Container>
  );
}
