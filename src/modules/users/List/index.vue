<template>
  <div>
    <a-row id="filter">
      <a-col :xs="24" :md="12" :lg="6">
        <a-input v-model="params.search" placeholder="Tìm kiếm">
          <a-icon slot="prefix" type="search"/>
        </a-input>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <EnumSelector v-model="params.status"
                      :enum-obj="CommonStatus"
                      placeholder="Lọc theo trạng thái"/>
      </a-col>
    </a-row>
    <a-table :columns="columns"
             :data-source="data"
             rowKey="id"
             :pagination="false"
             :scroll="{x: true}"
             @change="list">
      <span slot="avatar" slot-scope="image"><a-avatar icon="user" :src="image"/></span>
      <span slot="name" slot-scope="text">{{ text }}</span>
      <span slot="customTitle">Name</span>
      <span slot="statusTitle" slot-scope="status, user"
            :style="{color: status === CommonStatus.ACTIVE ? 'green' : 'red'}">{{ user.status_title }}</span>
      <span slot="action">
      <a-button icon="edit" size="small"></a-button>
      <a-divider type="vertical"/>
      <a-button icon="delete" size="small" type="danger"></a-button>
    </span>
    </a-table>
    <CustomPagination v-model="meta" @change="onChangePage"/>
  </div>
</template>

<script>
import {list} from "@/modules/users/service";
import {CommonMixin} from "@/services/mixins";
import {params} from "@/modules/users/params";
import {debounce} from 'lodash'
import EnumSelector from "@/components/EnumSelector";
import CustomPagination from "@/components/CustomPagination";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Ảnh đại diện',
    dataIndex: 'avatar',
    align: 'center',
    scopedSlots: {customRender: 'avatar'},
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: {customRender: 'statusTitle'},
  },
  {
    title: 'Action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  components: {CustomPagination, EnumSelector},
  mixins: [CommonMixin],
  data() {
    return {
      data: [],
      columns,
      meta: {
        current_page: 1,
        limit: 10
      },
      params: params,
    };
  },
  created() {
    this.list(this.params);
  },
  methods: {
    async list(params) {
      try {
        const {data} = await list(params);
        this.data = data.data;
        this.meta = data.meta;
      } catch (e) {
        console.log(e);
      }
    },
    onChangePage({page, limit}) {
      this.list({
        ...this.params,
        page,
        limit
      })
    },
    handleChangeParams: debounce(function (val) {
      this.list({...val, page: 1})
    }, 300)
  },
  watch: {
    params: {
      deep: true,
      handler: function (val) {
        this.handleChangeParams(val);
      }
    }
  }
}
</script>

<style scoped>
#filter {
  margin-bottom: 20px;
}

#filter .ant-col {
  padding: 3px;
}

.ant-table td {
  white-space: nowrap;
}
</style>