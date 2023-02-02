export interface LinkConfig {
  title: string;
  type: 'link';
  icon?: JSX.Element;
  routeId: string;
}

export interface FolderConfig {
  title: string;
  type: 'folder';
  icon?: JSX.Element;
  items: (LinkConfig | FolderConfig)[];
}

export type SideNavConfig = (FolderConfig | LinkConfig)[];
