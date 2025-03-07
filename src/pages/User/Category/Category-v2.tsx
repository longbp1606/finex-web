import { useEffect, useState } from 'react'
import * as CategoryStyled from './Category.styled';
import { message, Table, TableColumnsType } from 'antd';
import { CategoryResponse, listCategories } from '@/services/categoryAPI';

interface CategoryTableItemType extends CategoryResponse {
    index: number;
    key: string;
}

const Category = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [deleteIds, setDeleteIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        
        try {
            const response = await listCategories();

            if (response.status !== 200) throw response.data;
            else {
                setCategories(response.data.data as CategoryResponse[]);
            }
        } catch (error: any) {
            if (error.response) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error(error.code === 404 ? "This account haven't created" : error.message);
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns: TableColumnsType<CategoryTableItemType> = [
        {
            key: 'index',
            dataIndex: 'index',
            title: '#',
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
        },
        {
            key: 'language',
            dataIndex: 'language',
            title: 'Language',
        },
    ]

    return (
        <>
            {contextHolder}
            <CategoryStyled.Container>
                <CategoryStyled.Header>Category</CategoryStyled.Header>
                <CategoryStyled.SubHeader>
                    Organizing and classifying expenses in a logical and efficient manner to ensure better financial management.
                </CategoryStyled.SubHeader>

                <Table<CategoryTableItemType>
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        onChange: (ids) => {
                          setDeleteIds(ids.map(String));
                        },
                        selectedRowKeys: deleteIds.map(String),
                      }}
                    dataSource={categories ? categories.map((item, index) => ({
                        ...item,
                        index: index + 1,
                        key: item.id,
                    })) : []}
                    columns={columns}
                    />
            </CategoryStyled.Container>
        </>
    )
}

export default Category;