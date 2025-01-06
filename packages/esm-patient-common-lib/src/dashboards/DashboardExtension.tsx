import React, { useMemo } from 'react';
import classNames from 'classnames';
import last from 'lodash-es/last';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  ConfigurableLink,
  ActivityIcon,
  ShoppingCartIcon,
  MedicationIcon,
  ChartAverageIcon,
  CalendarHeatMapIcon,
  WarningIcon,
  ListCheckedIcon,
  DocumentAttachmentIcon,
  EventScheduleIcon,
  ReportIcon,
  SyringeIcon,
  ProgramsIcon,
} from '@openmrs/esm-framework';
import styles from './dashboard-extension.scss';

export interface DashboardExtensionProps {
  path: string;
  title: string;
  basePath: string;
  moduleName?: string;
  iconName?: string;
}

const MenuIcons = {
  'Patient Summary': ReportIcon,
  'Vitals & Biometrics': ActivityIcon,
  Medications: MedicationIcon,
  Orders: ShoppingCartIcon,
  Results: ChartAverageIcon,
  Visits: CalendarHeatMapIcon,
  Allergies: WarningIcon,
  Conditions: ListCheckedIcon,
  Immunizations: SyringeIcon,
  Attachments: DocumentAttachmentIcon,
  Programs: ProgramsIcon,
  Appointments: EventScheduleIcon,
} as const;

export type MenuTitle = keyof typeof MenuIcons;

const DashboardExtension = ({
  path,
  title,
  basePath,
  moduleName = '@openmrs/esm-patient-chart-app',
  iconName,
}: DashboardExtensionProps) => {
  const { t } = useTranslation(moduleName);
  const location = useLocation();
  const navLink = useMemo(() => decodeURIComponent(last(location.pathname.split('/'))), [location.pathname]);

  const renderIcon = () => {
    if (iconName) {
      const IconComponent = MenuIcons[title as MenuTitle];
      return IconComponent ? <IconComponent className={styles.icon} /> : null;
    }

    if (title in MenuIcons) {
      const IconComponent = MenuIcons[title as MenuTitle];
      return <IconComponent className={styles.icon} />;
    }

    return null;
  };

  return (
    <div key={path}>
      <ConfigurableLink
        className={classNames('cds--side-nav__link', { 'active-left-nav-link': path === navLink })}
        to={`${basePath}/${encodeURIComponent(path)}`}
      >
        <span className={styles.menu}>
          {renderIcon()}
          <span>{t(title)}</span>
        </span>
      </ConfigurableLink>
    </div>
  );
};

export default DashboardExtension;
