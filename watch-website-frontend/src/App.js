import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import publicRoutes from './routes';
import { Fragment } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout =
                            route.layout === null
                                ? Fragment
                                : route.layout === DefaultLayout
                                  ? DefaultLayout
                                  : route.layout === AdminLayout
                                    ? AdminLayout
                                    : UserLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
