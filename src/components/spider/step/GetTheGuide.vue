<template>
    <div>
        <v-tabs v-model="tab" fixed-tabs>
            <!-- 새로운 고정 탭 추가 -->
            <v-tab class="tab-title" key="fixed-tab">
                참조 아키텍처
            </v-tab>
            <!-- 기존 v-for를 사용한 탭들 -->
            <v-tab class="tab-title" v-for="item in items" :key="item.tab">
                {{ item.tab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="guide-box">
            <!-- 새로운 고정 탭 컨텐츠 -->
            <v-tab-item key="fixed-tab-content">
                <v-card flat style="padding:20px;">
                    <!-- 외부 컨테이너 div 추가 -->
                    <div class="img-box-wrap">
                        <div class="consumers-img-box">
                            <!-- <h2>Consumers</h2> -->
                            <img src="../image/consumers-pc.png" />
                        </div>
                        <div class="consumers-img-box-mo">
                            <!-- <h2>Consumers</h2> -->
                            <img src="../image/consumers-m.png" />
                        </div>
                        <div class="reference-img-box">
                            <!-- Frontend Images -->
                            <img v-if="frontEnd.micro" src="../image/referenceArchitecture/mic-frontend.png" />
                            <img v-if="frontEnd.monolith" src="../image/referenceArchitecture/mono-frontend.png" />

                            <!-- Gateway Image -->
                            <img  v-if="gateway" src="../image/referenceArchitecture/api.png" />

                            <!-- Inner Architecture Images -->
                            <img  v-else-if="serviceType.monolith" src="../image/referenceArchitecture/inner1.png" />
                            <img  v-else-if="serviceType.mini" src="../image/referenceArchitecture/inner2.png" />
                            <img  v-else-if="serviceType.micro" src="../image/referenceArchitecture/inner3.png" />
                            <img  v-if="serviceType.sidecar" src="../image/referenceArchitecture/inner4.png" />

                            <!-- Messaging Channel Image -->
                            <img  v-if="messagingChannel" src="../image/referenceArchitecture/Messaging.png" />

                            <!-- Infrastructure Images -->
                            <img  v-if="infra.kubernetes" src="../image/referenceArchitecture/Kubernetes.png" />
                            <img  v-else-if="infra.virtualMachine" src="../image/referenceArchitecture/vm.png" />
                            <img  v-else-if="infra.bareMetal" src="../image/referenceArchitecture/bare.png" />
                        </div>
                    </div>
                </v-card>
            </v-tab-item>
            <!-- 기존 v-for를 사용한 탭 컨텐츠들 -->
            <v-tab-item v-for="item in items" :key="item.tab">
                <v-card flat style="padding:20px;">
                    <div v-if="goalLevels[item.tab_en] > 0 && Object.keys(markdownContentFolders).length > 0"
                        v-html="markdownContentFolders[item.tab_en][goalLevels[item.tab_en]]">
                    </div>
                    <div v-else>
                        전환목표가 없습니다.
                    </div>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';

export default {
    name: "GetTheGuide",
    components: {
    },
    props: {
        selectedUser: null
    },
    data () {
        return {
            // 데이터 구조
            frontEnd: {
                monolith: false,
                micro: false,
            },
            gateway: false,
            serviceType: {
                monolith: false,
                mini: false,
                micro: false,
                sidecar: false,
            },
            messagingChannel: false,
            infra: {
                kubernetes: false,
                virtualMachine: false,
                bareMetal: false,
            },
            items: [
                {
                    tab: '기능분해',
                    tab_en: 'decomposition',
                },
                { 
                    tab: '데이터',
                    tab_en: 'data',
                },
                { 
                    tab: '소프트웨어 아키텍처',
                    tab_en: 'sw-architecture',
                },
                { 
                    tab: '인프라 아키텍처',
                    tab_en: 'infra-architecture',
                },
                { 
                    tab: '배포',
                    tab_en: "distribute",
                },
                { 
                    tab: '팀 구조와 문화',
                    tab_en: "team-structure",
                },
            ],
            tab: 0,
            markdownContentFolders: {},
            userPerspectives: [],
            goalLevels: {},
            contents: [],
        }
    },
    created() {
        this.loadUserPerspectives();
        this.checkReferenceArchitecture();
    },
    watch: {
        selectedUser: {
            handler(){
                this.markdownContentFolders = {}
                this.loadUserPerspectives();
                this.checkReferenceArchitecture();
            },
            deep:true
        },
        tab(newVal) {
            // 고정 탭 선택시 라우트 변경
            if (newVal === 0) {
                this.$router.push(`/get-the-guide/reference-architecture`);
                return;
            }

            // 기존 탭들에 대한 처리
            const tabName = this.items[newVal - 1].tab_en; // 인덱스 조정
            this.selectedUser.perspectives.forEach(p => {
                if (p.name_en === tabName) {
                    this.$router.push(`/get-the-guide/${tabName}/level${p.goalLevel}`);
                }
            });
        }
    },
    methods: {
        checkReferenceArchitecture() {
            const swArchitecture = this.selectedUser.perspectives.find(p => p.name_en === 'sw-architecture');
            const decomposition = this.selectedUser.perspectives.find(p => p.name_en === 'decomposition');
            const dataPerspective = this.selectedUser.perspectives.find(p => p.name_en === 'data');
            const infraArchitecture = this.selectedUser.perspectives.find(p => p.name_en === 'infra-architecture');

            // Frontend 조건 설정
            this.frontEnd.micro = swArchitecture && swArchitecture.goalLevel === 4;
            this.frontEnd.monolith = swArchitecture && swArchitecture.goalLevel < 4;

            // Gateway 조건 설정
            this.gateway = (decomposition && decomposition.goalLevel >= 2) || (dataPerspective && dataPerspective.goalLevel >= 2);

            // Inner Architecture 조건 설정
            this.serviceType.monolith = dataPerspective && dataPerspective.goalLevel <= 1;
            this.serviceType.mini = dataPerspective && dataPerspective.goalLevel === 2;
            this.serviceType.micro = dataPerspective && dataPerspective.goalLevel === 3;
            if (dataPerspective && dataPerspective.goalLevel >= 3 && swArchitecture && swArchitecture.goalLevel === 4) {
                this.serviceType.sidecar = true
            }

            // Messaging Channel 조건 설정
            this.messagingChannel = (decomposition && decomposition.goalLevel == 4) || (dataPerspective && dataPerspective.goalLevel == 4);

            // Infra 조건 설정
            this.infra.kubernetes = infraArchitecture && infraArchitecture.goalLevel >= 3;
            this.infra.virtualMachine = infraArchitecture && infraArchitecture.goalLevel === 2;
            this.infra.bareMetal = infraArchitecture && infraArchitecture.goalLevel <= 1;
        },
        async getAllMarkdownContentFolders() {
            try {
                const response = await axios.get(`https://api.github.com/repos/msa-ez/cloud-iq/contents/get-the-guide-md`);
                const markdownContentFolders = response.data.filter(item => item.type === 'dir');
                for (const folder of markdownContentFolders) {
                    await this.getFolderContents(folder.name);
                }
                this.$forceUpdate()
            } catch (error) {
                console.error("Failed to load markdownContentFolders", error);
            }
        },
        async getFolderContents(folderName) {
            try {
                let folderFiles = {};
                for (let i = 1; i <= 4; i++) {
                    const fileResponse = await axios.get(`https://raw.githubusercontent.com/msa-ez/cloud-iq/main/get-the-guide-md/${folderName}/level${i}.md`);
                    const markdownContent = marked(fileResponse.data);
                    folderFiles[i] =  markdownContent ;
                }
                this.markdownContentFolders[folderName] = folderFiles
            } catch (error) {
                console.error(`Failed to load contents for folder ${folderName}`, error);
            }
        },
        loadUserPerspectives() {
            if (this.selectedUser && this.selectedUser.perspectives) {
                this.selectedUser.perspectives.forEach(p =>{
                    this.goalLevels[p.name_en] = p.goalLevel
                });
                this.getAllMarkdownContentFolders()
            }
        }
    },
}
</script>
<style>
.tab-title {
    font-size: 16px;
    font-weight: 700;
}
.img-box-wrap {
    max-width: 1920px;
    width: 100%;
    height: calc(100vh - 270px);
    margin: 0 auto;
    display: flex;
    align-items: center; 
    justify-content: center;
}
.consumers-img-box {
    width: 25%;
    height: calc(100vh - 300px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
.consumers-img-box > img {
    display: block;
    max-height: 100%;
    height: 80%;
}
.consumers-img-box-mo {
    display: none;
    max-width: 767px;
    width: 100%;
}
.consumers-img-box-mo > img {
    max-width: 100%;
    width: 100%;
	height: auto;
}
.reference-img-box {
    max-width: 1000px;
    width: 50%;
    height: calc(100vh - 300px);
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.reference-img-box > img {
    max-width: 100%;
    width: 60%;
	height: auto;
}

@media only screen and (max-width:1579px) {
    .consumers-img-box > img {
        height: 75%;
    }
    .reference-img-box > img {
        width: 80%;
    }
}
@media only screen and (max-width:1299px) {
    .consumers-img-box > img {
        height: 70%;
    }
    .reference-img-box > img {
        width: 80%;
    }
    .reference-img-box > img {
        width: 90%;
    }
}
@media only screen and (max-width:1023px) {
    .consumers-img-box > img {
        height: 60%;
    }
    .reference-img-box > img {
        width: 100%;
    }
}
@media only screen and (max-width:767px) {
    .img-box-wrap {
        height: 100%;
        padding: 10px;
        flex-direction: column;
        justify-content: flex-start;
    }
    .consumers-img-box {
        display: none;
    }
    .consumers-img-box-mo {
        display: block;
    }
    .reference-img-box {
        width: 100%;
        height: 100%;
        justify-content: flex-start;
    }
}
</style>