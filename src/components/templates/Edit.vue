<template>
  <div class="medium-editor">
    <div class="row">
      <div class="flex md12">
        <div class="flex md4 sm6 xs12">
          <va-input v-model="templateName" placeholder="Last Name" />
        </div>
        <va-card :title="$t('forms.mediumEditor.title')">
          <div class="d-flex flex-center">
            <va-medium-editor

              @initialized="handleEditorInitialization"
               v-html="templateContent"
            >
            </va-medium-editor>
          </div>

          <va-button @click="btnSubmit" color="success">
            {{ $t("buttons.success") }}</va-button
          >
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "medium-editor",

  data() {
    return {
      templateName: null,
      templateContent: null
    };
  },

  created() {
    this.getTemplateLiist();
  },

  methods: {
    handleEditorInitialization(editor) {
      this.editor = editor;
      this.$nextTick(() => {
        this.highlightSampleText();
      });
    },

    btnSubmit() {
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
        .post(
          this.$apiURL + "templateUpdate",
          {
            userID: userID,
            templateID: this.$route.params.templateID,
            templateName: this.templateName,
            templateContents:this.editor.getContent(),

            editedBy: userID
            // password: this.password,
          },
          config
        )
        .then(results => {
          if (results.status == 200) {
            this.$router.push({ name: "template-list" });
          } else {
            //
          }
        });
    },

    getTemplateLiist() {
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
        .get(
          `${this.$apiURL}templateDetail/${this.$route.params.templateID}/${userID}`,
          config
        )

        .then(results => {
          if (results.status == 200) {
            this.templateName = results.data[0].templateName;
            this.templateContent = results.data[0].templateContents;

          }
        });
    },

    highlightSampleText() {
      const sampleText = document.getElementsByClassName(
        "default-selection"
      )[0];
      this.editor.selectElement(sampleText);
    }
  }
};
</script>
