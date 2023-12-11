<template>
    <vuetifyLayout>
        <div>
            <div style="display:none ;">
            <!-- 사용자 선택 -->
                <div class="user-box">
                    <h2>프로필 선택/등록</h2>
                    <!-- <div class="sub-tit">사용자 프로필을 선택하거나 등록하세요.</div> -->
                    <div class="user-box-in">
                        <v-select
                            :items="users"
                            :item-text="userDisplayText"
                            item-value="email"
                            label="사용자 선택"
                            v-model="selectedUser"
                            class="ml10"
                        ></v-select>
                    
                        <!-- 등록 버튼 -->
                        <v-btn color="primary" @click="showDialog = true" class="btn-reg">사용자 등록</v-btn>
                    </div>
                </div>
                <!-- 등록 다이얼로그 -->
                <v-dialog v-model="showDialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>사용자 등록</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent="registerUser">
                                    <v-text-field class="user-input-field"
                                        label="이름"
                                        v-model="newUser.name"
                                        :rules="newUser.nameRules"
                                        required
                                        style="width:300px;"
                                    ></v-text-field>
                                    <v-text-field class="user-input-field"
                                        label="이메일"
                                        v-model="newUser.email"
                                        :rules="newUser.emailRules"
                                        required
                                    ></v-text-field>
                                    <!-- 기타 필드 추가 -->
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <div class="reg-btn-box">
                                <v-btn color="primary" @click="registerUser">등록</v-btn>
                                <v-btn style="margin-left: 10px;border:1px solid #ddd;" text @click="closeDialog">취소</v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <Step v-if="selectedUser"
                @saveUsers="saveUsers"
                :selectedUser="user"
            />
        </div>
    </vuetifyLayout>
</template>
  
<script>
import Step from './step/Step.vue';
import AssessmentData from './step/AssessmentData';
import GoalSettingData from './step/GoalSettingData';

export default {
    mixins:[
        AssessmentData,
        GoalSettingData
    ],
    components: {
        Step
    },
    data() {
        return {
            showDialog: false,
            users: [],
            user:[],
            newUser: {
                name: '',
                email: '',
                nameRules: [
                    v => !!v || '이름을 입력해 주세요.'
                ],
                emailRules: [
                    v => !!v || '이메일을 입력해 주세요.', // 필수 입력 필드
                    v => /.+@.+\..+/.test(v) || '유효한 이메일 형식이 아닙니다.' // 이메일 형식 검사
                ],
                perspectives: [],
                topics:[],
            },
            selectedUser: null
        }
    },
    mounted() {
        this.selectedUser = this.users[0].email
    },
    created() {
        this.loadUsers();
        
    },
    watch: {
        selectedUser: {
            handler(selectedUser){
                this.user = this.users.find(user => user.email == selectedUser)
            }
        }
    },
    methods: {
        saveUsers() {
            localStorage.setItem('registeredUsers', JSON.stringify(this.users));
        },
        loadUsers() {
            const users = localStorage.getItem('registeredUsers');
            if (users) {
                this.users = JSON.parse(users);
            }
            if (this.users.length == 0) {
                var newUser = { ...this.newUser }
                newUser.perspectives = this.perspectives
                newUser.topics = this.topics
                newUser.name = '유엔진'
                newUser.email = 'uengine@uengine.org'
                this.users.push(newUser);
                this.user = newUser
                this.selectedUser = newUser.email
                this.saveUsers()
            }
        },
        userDisplayText(item) {
            return `${item.name} (${item.email})`; // 이름과 이메일을 결합
        },
        registerUser() {
            var newUser = { ...this.newUser }
            newUser.perspectives = this.perspectives
            newUser.topics = this.topics
            this.users.push(newUser);
            this.user = newUser
            this.selectedUser = newUser.email
            this.saveUsers()
            this.closeDialog();
        },
        closeDialog() {
            this.showDialog = false;
            this.newUser.name = '';
            this.newUser.email = '';
        }
    }
}
</script>
<style>
.user-box {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    /* border-bottom: 1px dashed #ccc; */
    /* border-radius: 5px;
    padding: 10px; */
    /* box-shadow: 0 4px 4px -4px #333; */
    /* box-shadow: 0 1px 2px 1px #ddd; */
}
.user-box-in {
    width: 86%;
    display: flex;
    align-items: center;
}
.ml10, .btn-reg {
    margin-left: 10px;
}
.user-input-field .v-messages__message {
    line-height: 18px;
}
.reg-btn-box {
    margin: 0 10px 10px 0;
}

@media only screen and (max-width:1440px) {
    .user-box > h2 {
        font-size: 22px;
    }
    .user-box-in {
        width: 82%;
    }
}
@media only screen and (max-width:1024px) {
    .user-box-in {
        width: 75%;
    }
}
@media only screen and (max-width:750px) {
  .user-box {
    height: 90px;
    display: block;
  }
  .user-box-in {
    width: 100%;
  }
  .ml10 {
    margin: 0;
  }
  .btn-reg {
    margin-top: -10px;
  }
} 
</style>
  