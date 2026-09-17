import {App as KonstaApp, Page, Tabbar, TabbarLink, ToolbarPane} from 'konsta/react'
import {NavLink, Outlet, useLocation} from 'react-router-dom'
import './App.css'
import {isNavItemActive, navItems} from './navigation.tsx'
import PwaUpdatePrompt from './PwaUpdatePrompt.tsx'

/**
 * iOS-first app shell: a single scroll container with a sticky navbar per page,
 * plus the fixed tab bar. `App` is the route layout element, so pages render
 * into `Outlet`.
 */
function App() {
    const {pathname} = useLocation()

    return (
        <KonstaApp theme="ios" safeAreas>
            <Page>
                <div>
                    <Outlet/>
                </div>
            </Page>
            <Tabbar labels icons className="left-0 bottom-0 fixed z-30">
                <ToolbarPane>
                    {navItems.map((item) => {
                        const active = isNavItemActive(item, pathname)

                        return (
                            <TabbarLink
                                key={item.path}
                                active={active}
                                label={item.label}
                                icon={item.icon}
                                component={NavLink}
                                linkProps={{
                                    to: item.path,
                                    'aria-current': active ? 'page' : undefined,
                                }}
                            />
                        )
                    })}
                </ToolbarPane>
            </Tabbar>
            <PwaUpdatePrompt/>
        </KonstaApp>
    )
}

export default App
