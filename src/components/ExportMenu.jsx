import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ExportMenu({ config, data }) {
  const { t } = useTranslation();
  const [anchor, setAnchor] = useState(null);

  return (
    <div classname="bg-red-500 border border-black">
      <Button onClick={(e) => setAnchor(e.currentTarget)}>{t('buttons.export')}</Button>
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        {config.map((ex) => (
          <MenuItem key={ex.id} onClick={() => { ex.handler(data); setAnchor(null); }}>
            {t(ex.labelKey)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}