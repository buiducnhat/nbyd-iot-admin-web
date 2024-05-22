import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Col, Divider, Flex, Row, Skeleton, Typography } from 'antd';

import useApp from '@/hooks/use-app';
import dashboardService from '@/modules/dashboard/dashboard.service';
import TitleHeading from '@/shared/components/title-heading';

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { t, token } = useApp();

  const dashboardQuery = useQuery({
    queryKey: ['/dashboard'],
    queryFn: () => dashboardService.getData(),
  });

  const colors = [token.blue, token.green, token.orange, token.red];

  return (
    <Flex vertical>
      <TitleHeading>{t('Dashboard')}</TitleHeading>

      <Divider />

      <Row gutter={[token.size, token.size]}>
        {['usersCount', 'projectsCount', 'gatewaysCount', 'devicesCount'].map(
          (key: any, index) => (
            <Col key={key} span={6}>
              {dashboardQuery.isLoading ? (
                <Skeleton active />
              ) : (
                <Flex
                  vertical
                  css={css`
                    padding: ${token.padding}px;
                    padding-top: ${token.paddingXS}px;
                    background-color: ${colors[index]}25;
                    border-radius: ${token.borderRadius}px;
                  `}
                >
                  <Typography.Text
                    strong
                    css={css`
                      color: ${colors[index]};
                      font-size: ${token.fontSizeHeading5}px;
                    `}
                  >
                    {t(key)}
                  </Typography.Text>

                  <Typography.Text
                    strong
                    css={css`
                      font-size: ${token.fontSizeHeading3}px;
                      text-align: center;
                    `}
                  >
                    {(dashboardQuery.data?.data as any)?.[key]}
                  </Typography.Text>
                </Flex>
              )}
            </Col>
          ),
        )}
      </Row>
    </Flex>
  );
}

export default DashboardPage;
