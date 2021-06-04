import React, { useState } from 'react';
import { Button, Tab, TabBody, ActionSheet, Page } from 'react-weui';
import Header from '@/components/Header';

const Home = () => {
  const [showAction, setShowAction] = useState(false);
  const hide = () => {
    setShowAction(false);
  };
  const [menus, setMenus] = useState([
    {
      label: 'Option 1',
      onClick: () => hide(),
    },
    {
      label: 'Option 2',
      onClick: () => {},
    },
  ]);

  const [actions, setActions] = useState([
    {
      label: '取消',
      onClick: () => hide(),
    },
  ]);

  return (
    <Page transition infiniteLoader>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <Header />
        <Tab>
          <TabBody>
            <Button onClick={() => setShowAction(true)}>hello wechat</Button>
          </TabBody>
          <ActionSheet
            actions={actions}
            menus={menus}
            show={showAction}
            onRequestClose={() => setShowAction}
          />
        </Tab>
      </div>
    </Page>
  );
};

export default Home;
