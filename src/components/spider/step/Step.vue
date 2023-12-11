<template>
    <div>
        <v-stepper v-model="currentStep" class="box-wrap">
            <v-stepper-header>
                <template v-for="n in components.length">
                    <v-stepper-step
                        :key="`${n}-step`"
                        :complete="currentStep > n"
                        :step="n"
                        editable
                    >
                    <div>
                        <div>Step {{ n }}</div>
                        <div>{{ components[n - 1].name }}</div>
                    </div>
                    </v-stepper-step>
        
                    <v-divider
                        v-if="n !== components.length"
                        :key="n"
                    ></v-divider>
                </template>
            </v-stepper-header>
  
            <v-stepper-items class="step-box">
                <v-stepper-content
                    v-for="n in components.length"
                    :key="`${n}-content`"
                    :step="n"
                >
                    <v-card class="mb-12 step-box-in">
                        <component @saveUsers="saveUsers" :selectedUser="selectedUser" :is="components[n - 1].component" />
                    </v-card>
                    
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <!-- <div class="btn-box">
            <v-btn class="btn-bot"
                color="primary"
                @click="nextStep()"
                :disabled="currentStep === components.length">Next</v-btn>
            <v-btn class="btn-bot" text>Cancel</v-btn>
        </div> -->
    </div>
</template>

<script>
import Assessment from './Assessment';
import GoalSetting from './GoalSetting';
import GetTheGuide from './GetTheGuide';

export default {
    components: {
    },
    props: {
        selectedUser: null,
    },
    data () {
        return {
            stepNumber: 0,
            currentStep: 1,
            components: [
                { component: GoalSetting, name: '목표수준설정', name_en: 'GoalSetting', path: 'goal-setting' },
                { component: Assessment, name: '현수준평가', name_en: 'Assessment', path: 'assessment' },
                { component: GetTheGuide, name: '전환가이드', name_en: 'GetTheGuide', path: 'get-the-guide' }
            ],
        }
    },
    created() {
        const path = this.$route.params.path;
        const matchingComponentIndex = this.components.findIndex(c => c.path === path);
        if (matchingComponentIndex !== -1) {
            this.currentStep = matchingComponentIndex + 1;
        }
    },
    watch: {
        currentStep(newVal, oldVal) {
            if (newVal !== oldVal) {
                const path = this.components[newVal - 1].path;
                if (this.$route.params.path !== path) {
                    this.$router.push(`/${path}`);
                }
            }
        }
    },
    methods: {
        saveUsers(){
            this.$emit('saveUsers')
        },
        // nextStep () {
        //     if (this.currentStep === this.components.length) {
        //     } else {
        //         this.currentStep++
        //     }
        // },
    },
}
</script>

<style>
.box-wrap {
    height:calc(100vh - 60px);
    /* border:1px solid blue; */
}
.step-box {
    /* overflow: auto; */
    height:calc(100vh - 60px);
    /* background-color: lightgoldenrodyellow; */
}
.step-box-in { 
    /* step-box 안의 흰 박스 */
    height:calc(100vh - 180px);
	/* background-color: lightpink; */
}
.qna-box {
    /* width: 130%; */
    height: calc(100vh - 180px);
	overflow: auto;
    padding: 20px;
	/* border: 1px solid pink; */
}
.btn-box {
    text-align: right;
    margin-top: 10px;
}
.guide-box {
    height: calc(100vh - 230px);
    overflow: auto;
}

@media only screen and (max-width:1100px) {
    .qna-box {
        /* width: 100%; */
    }
}
@media only screen and (max-width:700px) {
    .box-wrap, .step-box, .step-box-in {
        height:100%;
    }
    .qna-box {
        height: 50vh;
        padding: 0;
    }
    .btn-bot {
        margin-bottom:10px;
    }
}
</style>
