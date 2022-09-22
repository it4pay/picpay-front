import {useState} from 'react';
import {useRouter} from 'next/router';
// @mui
import {Link} from '@mui/material';
//
import {NavListProps} from '../type';
import NavItem from './NavItem';
import {getActive, isExternalLink} from '..';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChildren: boolean;
  isCollapse?: boolean;
};

export default function NavList(
  {
    data,
    depth,
    hasChildren,
    isCollapse = false,
  }: NavListRootProps) {
  const {pathname, asPath, push} = useRouter();

  const active = getActive(data.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const handleClickItem = () => {
    if (!hasChildren) {
      push(data.path);
    }
    setOpen(!open);
  };

  return (
    <>
      {isExternalLink(data.path) ? (
        <Link href={data.path} target="_blank" rel="noopener" underline="none">
          <NavItem item={data} depth={depth} open={open} active={active} isCollapse={isCollapse}/>
        </Link>
      ) : (
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          isCollapse={isCollapse}
          onClick={handleClickItem}
        />
      )}

    </>
  );
}
