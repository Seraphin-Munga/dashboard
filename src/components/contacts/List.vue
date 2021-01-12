<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <button @click="EditAdmin(props)" class="btn btn-primary">
            Edit
          </button>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: "my-component",

  props: {
    pageChanged: {
      type: Function
    },
    perPageChanged: {
      type: Function
    },
    column: {
      field: "action"
    }
  },

  created() {
    this.getUserList();
  },
  data() {
    return {
      columns: [
        {
          label: "First Name",
          field: "firstName"
        },
        {
          label: "Last Name",
          field: "lastName"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "Phone Number ",
          field: "telephone"
        },

        {
          label: "id",
          field: "userID",
          hidden: true
        },
        {
          label: "Action",
          field: "action"
        }
      ],
      rows: []
    };
  },

  methods: {
    getUserList() {

        const userID = this.$session.get("userID");

      let config = {
        headers: {
          Authorization: "Bearer " + this.$session.get("accessToken"),
          // "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      };
      this.$axios
        .get(`${this.$apiURL}contactLst/${userID}`, config)

        .then(results => {
          if (results.status == 200) {
            this.rows = results.data;
          }
        });
    },

    EditAdmin(value) {
      this.$router.push({
        name: "contact-edit",
        params: { contactID: value.row.contactID }
      });
    }
  }
};
</script>
