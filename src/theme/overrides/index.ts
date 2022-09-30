import { Theme } from '@mui/material/styles';

import Button from "./Button";
import CssBaseline from "./CssBaseline";
import Card from './Card';
import Breadcrumbs from "./Breadcrumbs";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Breadcrumbs(theme),
    Button(theme),
    Card(theme),
    CssBaseline(theme)
  )
}