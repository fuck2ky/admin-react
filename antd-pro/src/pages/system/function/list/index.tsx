import { LeftOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from '@/pages/data';
import { history } from 'umi';
import { queryList, update } from './service';
import UpdateForm from './components/UpdateForm';

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在更新');
  try {
    const data = await update(fields);
    hide();
    if (data && data.code === 200) {
      message.success('更新成功');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = (props: any) => {
  const { location } = props;
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectRecord, setSelectRecord] = useState<any | undefined>(undefined);

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 85,
    },
    {
      title: '按钮文字',
      dataIndex: 'txt',
    },
    {
      title: '功能点描述',
      dataIndex: 'desc',
    },
    {
      title: '接口地址',
      dataIndex: 'apiUrl',
      hideInSearch: true,
    },
    {
      title: '请求方法',
      dataIndex: 'apiMethod',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setSelectRecord(record);
            }}
          >
            配置
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper
      title="功能点列表"
      content={
        <Button
          icon={<LeftOutlined />}
          onClick={() => {
            history.goBack();
          }}
        >
          返回
        </Button>
      }
    >
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={async params => {
          const data = await queryList({
            ...params,
            pid: location.state.pid,
          });
          return data.data;
        }}
        columns={columns}
      />

      {updateModalVisible && (
        <UpdateForm
          initVals={selectRecord}
          modalVisible={updateModalVisible}
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
            return success;
          }}
          onCancel={() => {
            setSelectRecord(undefined);
            setTimeout(() => {
              handleUpdateModalVisible(false);
            }, 0);
          }}
        />
      )}
    </PageHeaderWrapper>
  );
};

export default TableList;