import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <ArrowBackIcon className="cursor-pointer" onClick={() => navigate(-1)} />
    </div>
  );
}