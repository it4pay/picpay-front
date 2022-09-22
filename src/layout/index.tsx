import {ReactNode} from 'react';
// guards
// components
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: 'dashboard' | 'logoOnly';
};

export default function Layout({variant = 'dashboard', children}: Props) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  return (
    <DashboardLayout> {children} </DashboardLayout>
  );
}
