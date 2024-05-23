import {
  DeleteOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  Input,
  Popover,
  Space,
  Table,
  TablePaginationConfig,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDebounce } from 'react-use';

import useApp from '@/hooks/use-app';
import { useAppTitle } from '@/hooks/use-app-title';
import ProjectsFilterForm from '@/modules/projects/components/projects-filter-form';
import projectService from '@/modules/projects/project.service';
import TitleHeading from '@/shared/components/title-heading';

type TTableParams = {
  pagination: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, any>;
};

export const Route = createFileRoute('/_app/projects')({
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t, antdApp, token } = useApp();

  useAppTitle(t('Projects'));

  const { message, modal } = antdApp;

  const [tableParams, setTableParams] = useState<TTableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {
      search: '',
    },
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState<string>('');

  useDebounce(
    () => {
      setTableParams({
        ...tableParams,
        filters: {
          ...tableParams.filters,
          search: search,
        },
      });
    },
    1000,
    [search],
  );

  const getProjectsQuery = useQuery({
    queryKey: [
      '/projects/get-paginated',
      tableParams.pagination,
      tableParams.filters,
    ],
    queryFn: () =>
      projectService.getPaginated({
        take: tableParams.pagination?.pageSize || 10,
        skip:
          tableParams.pagination?.current && tableParams.pagination?.pageSize
            ? (tableParams.pagination?.current - 1) *
              tableParams.pagination?.pageSize
            : 0,
        ...tableParams.filters,
        sort: tableParams.sortField,
        order: tableParams.sortOrder as 'ASC' | 'DESC',
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => {
      getProjectsQuery.refetch();
      message.success(t('Deleted successfully'));
    },
    onError: () => {
      message.error(t('An error occurred'));
    },
  });

  const deleteManyUsersMutation = useMutation({
    mutationFn: (ids: string[]) => projectService.deleteMany(ids),
    onSuccess: () => {
      getProjectsQuery.refetch();
      message.success(t('Deleted successfully'));
    },
    onError: () => {
      message.error(t('An error occurred'));
    },
  });

  return (
    <>
      <TitleHeading>{t('Project management')}</TitleHeading>

      <Divider />

      <Flex vertical gap={token.size}>
        <Flex justify="space-between">
          <Space direction="horizontal" style={{ width: '100%' }}>
            <Button
              danger
              type="dashed"
              disabled={selectedRowKeys.length === 0}
              onClick={() => {
                modal.confirm({
                  title: t('Delete confirmation'),
                  content: t(
                    'Are you sure you want to delete the selected items?',
                  ),
                  okText: t('Yes'),
                  cancelText: t('No'),
                  onOk: async () => {
                    await deleteManyUsersMutation.mutateAsync(
                      selectedRowKeys.map((key) => key.toString()),
                    );
                  },
                });
              }}
            >
              {t('Delete selected')}
            </Button>
          </Space>

          <div>
            <Space direction="horizontal" style={{ width: '100%' }}>
              <Popover
                placement="bottomRight"
                trigger="click"
                title={t('Filter')}
                content={
                  <ProjectsFilterForm
                    onSubmit={(values: any) => {
                      setTableParams({
                        ...tableParams,
                        filters: values,
                      });
                    }}
                  />
                }
              >
                <Button icon={<FilterOutlined />}>{t('Filter')}</Button>
              </Popover>

              <Input.Search
                placeholder={t('Search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Space>
          </div>
        </Flex>

        <Table
          loading={getProjectsQuery.isLoading || getProjectsQuery.isFetching}
          dataSource={getProjectsQuery.data?.data.items || []}
          pagination={tableParams.pagination}
          rowKey={(record) => record.id}
          bordered
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            },
          }}
          columns={[
            {
              title: t('ID'),
              dataIndex: 'id',
              key: 'id',
              width: 200,
            },
            {
              title: t('Project'),
              key: 'project',
              render: (_, record) => (
                <Space>
                  <Avatar
                    shape="square"
                    src={record.imageFileUrl}
                    css={css`
                      background-color: ${token.colorPrimary};
                    `}
                  >
                    <DeploymentUnitOutlined />
                  </Avatar>
                  <Typography.Text strong>{record.name}</Typography.Text>
                </Space>
              ),
            },
            {
              title: t('Status'),
              dataIndex: 'status',
              key: 'status',
            },
            {
              title: t('Location'),
              dataIndex: 'location',
              key: 'location',
            },
            {
              title: t('Gateways'),
              key: 'gatewaysCount',
              render: (_, record) => record._count.gateways,
            },
            {
              title: t('Owner'),
              key: 'owner',
              render: (_, record) => (
                <Space>
                  <Avatar src={record.members[0].user.avatarImageFileUrl}>
                    {record.members[0].user.firstName.charAt(0)}
                  </Avatar>
                  <Typography.Text>
                    {record.members[0].user.firstName}{' '}
                    {record.members[0].user.lastName}
                  </Typography.Text>
                </Space>
              ),
            },
            {
              title: t('Created at'),
              dataIndex: 'createdAt',
              key: 'createdAt',
              render: (value: string) =>
                dayjs(value).format('DD/MM/YYYY - HH:mm:ss'),
            },
            {
              key: 'actions',
              fixed: 'right',
              width: 100,
              render: (_, record) => (
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: t('Delete'),
                        key: 'delete',
                        icon: <DeleteOutlined />,
                        danger: true,
                        onClick: () => {
                          modal.confirm({
                            title: t('Delete confirmation'),
                            content: t(
                              'Are you sure you want to delete this item?',
                            ),
                            okText: t('Yes'),
                            cancelText: t('No'),
                            onOk: async () => {
                              await deleteMutation.mutateAsync(record.id);
                            },
                          });
                        },
                      },
                    ],
                  }}
                >
                  <Button>
                    <Space>
                      {t('Actions')}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              ),
            },
          ]}
          onChange={(pagination) => {
            setTableParams({
              ...tableParams,
              pagination,
            });
          }}
        />
      </Flex>
    </>
  );
}

export default ProjectsPage;
