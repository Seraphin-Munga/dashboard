<template>
  <div class="medium-editor">
    <div class="row">
      <div class="flex md12">
        <div class="flex md4 sm6 xs12">
          <va-input v-model="templateName" placeholder="Temple Name" />
        </div>
        <va-card :title="$t('forms.mediumEditor.title')">
          <div class="d-flex flex-center">
            <va-medium-editor
              v-model="templateContent"
              @initialized="handleEditorInitialization"
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
          this.$apiURL + "templateCreation",
          {
            userID: userID,
            templateName: this.templateName,
            templateContents:this.editor.getContent(),

            createdBy: userID
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

    highlightSampleText() {
      const sampleText = document.getElementsByClassName(
        "default-selection"
      )[0];
      this.editor.selectElement(sampleText);
    }
  }
};
</script>
