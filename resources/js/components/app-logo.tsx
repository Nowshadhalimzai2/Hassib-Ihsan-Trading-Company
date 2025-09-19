import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div title="dashboarLogo" className="text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-md">
                <AppLogoIcon className="size-full fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm" title="dashboardname">
                <span className="mb-0.5 truncate leading-none font-semibold">Basit Ishaq Limited</span>
            </div>
        </>
    );
}
