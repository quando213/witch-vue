<template>
  <div class="clearfix">
    <a-upload
        :action="action"
        :headers="headers"
        :data="{folder: this.folder}"
        list-type="picture-card"
        :file-list="fileList"
        :multiple="limit - fileList.length > 1"
        @preview="handlePreview"
        @change="handleChange"
    >
      <div v-if="fileList.length < limit">
        <a-icon type="plus"/>
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
  </div>
</template>

<script>
import {getHeaders} from "@/services";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  name: "ImageUpload",
  model: {
    prop: 'images',
    event: 'input'
  },
  props: {
    images: Array,
    folder: String,
    limit: Number,
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      action: `${process.env.VUE_APP_BASE_URL}api/admin/upload`,
      headers: getHeaders(),
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({file, fileList}) {
      if (file.status === 'done' || file.status === 'removed') {
        this.emitChange(fileList);
      }
      this.fileList = fileList;
    },
    emitChange(fileList) {
      this.$emit('input', fileList.map(a => a.url ? a.image : a.response.data.image));
    },
    convertToArrayObj(array) {
      return array.map(a => ({
        'uid': a,
        'name': a,
        'status': 'done',
        'url': process.env.VUE_APP_BASE_URL + 'images/upload/' + a,
        'image': a,
      }));
    },
  },
  watch: {
    images: {
      immediate: true,
      handler: function (val) {
        this.fileList = val ? this.convertToArrayObj(val) : [];
      }
    }
  }
};
</script>

<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>