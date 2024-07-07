import type { ModuleItem } from 'graphinx';

export function linkToItem(item: ModuleItem | undefined) {
	if (!item) return '';
	return `/${item.moduleName}#${item.type}/${item.name}`;
}
