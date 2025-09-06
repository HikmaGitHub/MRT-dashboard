import dayjs from 'dayjs';

export const columns = (t) => [
  { accessorKey: 'driverName', header: t('table.driver') },
  { accessorKey: 'vehicle', header: t('table.vehicle') },
  { accessorKey: 'location', header: t('table.location') },
  { accessorKey: 'status', header: t('table.status') },
  {
    accessorKey: 'lastUpdated',
    header: t('table.lastUpdated'),
    Cell: ({ cell }) => dayjs(cell.getValue()).format('YYYY-MM-DD'),
    sortingFn: 'datetime'
  }
];