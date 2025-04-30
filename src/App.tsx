import { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Layout, Menu, ConfigProvider, theme, Switch, Space, Grid, Drawer, Button
} from 'antd';
import { BulbOutlined, MoonOutlined, MenuOutlined } from '@ant-design/icons';
import { routes } from './routes';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

function AppInner() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  const pathToKey: { [key: string]: string } = {
    '/': '1',
    '/risk': '2',
    '/workflow': '3',
  };

  const keyToPath: { [key: string]: string } = {
    '1': '/',
    '2': '/risk',
    '3': '/workflow',
  };

  const selectedKey = pathToKey[location.pathname] || '1';

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const menuItems = [
    { key: '1', label: 'Dashboard' },
    { key: '2', label: 'Risk' },
    { key: '3', label: 'Workflow' },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          background: darkMode ? '#001529' : '#ffffff',
          borderBottom: '1px solid #f0f0f0'
        }}>
          {/* Mobile Menu */}
          {!screens.md && (
            <>
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: darkMode ? '#fff' : '#000' }} />}
                onClick={() => setMobileMenuOpen(true)}
                style={{ marginRight: 8 }}
              />
              <Drawer
                title="Navigation"
                placement="left"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
              >
                <Menu
                  mode="vertical"
                  selectedKeys={[selectedKey]}
                  onClick={(e) => {
                    navigate(keyToPath[e.key]);
                    setMobileMenuOpen(false);
                  }}
                  items={menuItems}
                />
              </Drawer>
            </>
          )}

          {/* Desktop Menu */}
          {screens.md && (
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[selectedKey]}
              onClick={(e) => navigate(keyToPath[e.key])}
              style={{ flex: 1 }}
              items={menuItems}
            />
          )}

          {/* Theme Toggle */}
          <div>
            <Space>
              {darkMode
                ? <MoonOutlined style={{ color: '#fff' }} />
                : <BulbOutlined style={{ color: '#000' }} />}
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Space>
          </div>
        </Header>

        <Content style={{ padding: screens.xs ? '12px' : '24px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((r, i) => (
                <Route key={i} path={r.path} element={<r.element />} />
              ))}
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
