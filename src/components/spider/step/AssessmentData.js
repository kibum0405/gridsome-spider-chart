export default {
    data() {
        return {
            isAllLevelsCompleted: false,
			perspectives: [
				{
					name: '기능분해관점',
					name_en: 'decomposition',
					goalLevel: 0,
					levels: [
						{ 
							checkpoints: [
								{ text: '비즈니스 역량 도출: 비즈니스 도메인을 분석하여 주요 기능과 유즈케이스를 도출하였는가?', checked: false },
								{ text: '기능 정의: 각 기능을 명확하게 정의하고 해당 기능의 범위를 결정하였는가?', checked: false },
								{ text: '유즈케이스 식별: 각 기능에 대한 유즈케이스를 식별하고 이를 단위로 분리하였는가?', checked: false },
								{ text: '의존성 분석: 각 기능과 유즈케이스 간의 의존성을 분석하여 적절한 분리 수준을 결정하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '인터페이스 설계: 각 유즈케이스와 관련된 데이터에 대한 인터페이스를 정의하고 필요한 메소드와 매개변수를 명시하였는가?', checked: false },
								{ text: '데이터 액세스 계획: 각 유즈케이스에서 필요한 데이터 액세스 방법을 계획하고 이를 인터페이스에 반영하였는가?', checked: false },
								{ text: '보안 및 인증 고려: 서비스 간의 인터페이스에서 보안 및 인증 요구사항을 고려하여 액세스 제어 방법을 정의하였는가?', checked: false },
								{ text: '에러 핸들링 정의: 인터페이스에서 발생할 수 있는 예외 상황에 대한 처리 방법과 오류 핸들링 전략을 정의하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'Ubiquitous language 정의: 각 bounded context에서 사용될 공통 언어와 용어를 정의하고 이를 문서화하였는가?', checked: false },
								{ text: 'Boundary 정의: 각 bounded context의 경계를 명확하게 정의하고 외부에서의 커뮤니케이션 방식을 결정하였는가?', checked: false },
								{ text: 'Anti-corruption layer 구현: bounded context 간의 통신을 관리하기 위해 Anti-corruption layer를 구현하고 외부 인터페이스 변환 및 데이터 변환을 수행하였는가?', checked: false },
								{ text: '도메인 이벤트 식별: bounded context 간에 필요한 도메인 이벤트를 식별하고 이를 통해 비동기적인 상호작용을 구현하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'CQRS 모델 설계: 읽기와 쓰기를 위한 별도의 모델을 설계하고 도메인 이벤트를 활용하였는가?', checked: false },
								{ text: '이벤트 스토리지 구현: 도메인 이벤트를 저장하고 관리하기 위한 이벤트 스토리지를 구현하였는가?', checked: false },
								{ text: '이벤트 드리븐 아키텍처 구축: 도메인 이벤트를 기반으로 비즈니스 로직을 처리하는 이벤트 드리븐 아키텍처를 구축하였는가?', checked: false },
								{ text: '이벤트 버전 관리: 도메인 이벤트의 버전을 관리하고 업데이트할 수 있는 메커니즘을 도입하였는가?',checked: false },
								{ text: '이벤트 소싱 및 재생: 이벤트 소싱을 통해 시스템 상태를 재생하고 이벤트 스트림을 통해 상태 변경을 추적하였는가?',checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					name: '데이터 관점',
					name_en: 'data',
					goalLevel: 0,
					levels: [
						{
							checkpoints: [
								{ text: '트랜잭션 관리: 각 마이크로서비스에서 ACID 기반의 트랜잭션을 유지하기 위한 방법과 프레임워크를 도입하였는가?', checked: false },
								{ text: '데이터 일관성 유지: Canonical Data Model을 도입하여 데이터의 일관성을 유지하고 데이터의 중복 및 모순을 방지하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '개별 스키마 정의: 각 마이크로서비스는 자체적인 스키마를 가지고 있으며, 각 서비스의 데이터 구조와 필드 정의가 명확하게 이루어졌는가?', checked: false },
								{ text: '다중 엔터프라이즈 데이터 조정: 서비스 간의 다중 엔터프라이즈 데이터 저장소와의 트랜잭션 조정 방식을 정의하고 이를 구현하였는가?', checked: false },
								{ text: '데이터 일관성 유지: 데이터 조정 및 동기화 과정에서 데이터 일관성을 유지하기 위한 메커니즘을 도입하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '분산 데이터 관리: 각 마이크로서비스는 완전히 분산된 데이터 관리를 수행하고 있으며, 필요에 따라 데이터의 파티셔닝, 샤딩, 복제 등을 구현하였는가?', checked: false },
								{ text: '폴리글랏 퍼시스턴스: 각 마이크로서비스는 자체적으로 다른 유형의 DBMS를 사용할 수 있는 폴리글랏 퍼시스턴스를 구현하였는가?', checked: false },
								{ text: '데이터 접근 및 관리: 각 마이크로서비스에서 필요한 데이터 액세스 방법을 선택하고 이를 효율적으로 관리하고 있으며, 성능과 확장성을 고려하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '이벤트 기반 데이터 관리: 이벤트 중심 아키텍처를 구축하여 각 마이크로서비스 간의 데이터 흐름을 이벤트 기반으로 관리하고 있는가?', checked: false },
								{ text: '이벤트 소싱 및 커맨드-쿼리 분리(CQRS): 이벤트 소싱을 통해 시스템의 상태를 재생하고 커맨드와 쿼리를 분리하여 비동기적인 데이터 처리를 구현하였는가?', checked: false },
								{ text: '데이터 일관성 관리: 일시적으로 데이터에 일관성이 없는 상태가 존재할 수 있으며, 이를 일정 시간 내에 해소하여 다시 일관성을 충족시키는 메커니즘을 구현하였는가?', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					name: '소프트웨어 아키텍처 관점',
					name_en: 'sw-architecture',
					goalLevel: 0,
					levels: [
						{
							checkpoints: [
								{ text: 'UI/UX: Server Side Rendering (SSR): 클라이언트 요청 시 서버에서 페이지를 완전히 렌더링하여 전송하는 방식을 사용합니다. 이를 통해 초기 로딩 속도를 개선하고 SEO에 더 유리한 환경을 제공할 수 있습니다.', checked: false },
								{ text: 'Session-based 보안: 세션을 사용하여 사용자 인증 및 권한 부여를 처리합니다. 세션은 서버에 저장되어 클라이언트와의 상태를 유지하고 보안을 강화합니다.', checked: false },
								{ text: '단일 언어(예: Spring Framework): 특정 언어 또는 프레임워크에 의존하여 애플리케이션을 개발합니다. 예를 들어, Spring Framework를 사용하여 모노리틱 서비스를 구축하고 운영합니다.', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'UI/UX: Server Side Rendering (SSR): Level 1과 동일하게 서버에서 페이지를 렌더링하여 전송합니다.', checked: false },
								{ text: 'Session Cluster 적용: 세션 클러스터링을 통해 여러 서버 간에 세션 정보를 공유하여 확장성과 가용성을 개선합니다.', checked: false },
								{ text: 'MSA 지향 언어(예: Spring Boot): 마이크로서비스 아키텍처에 적합한 언어 또는 프레임워크를 선택하여 개발합니다. Spring Boot와 같은 경량화된 프레임워크를 사용하여 서비스를 독립적으로 구축하고 배포합니다.', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'UI/UX: Client Side Rendering (CSR): 클라이언트에서 페이지 렌더링을 수행하고 필요한 데이터만 서버로부터 요청하여 가져옵니다. 이를 통해 초기 로딩 시간을 줄이고 사용자 경험을 향상시킬 수 있습니다.', checked: false },
								{ text: 'Token-based 보안, OAuth2: 세션 대신 토큰을 사용하여 사용자 인증과 권한 부여를 처리합니다. OAuth2와 같은 표준 프로토콜을 사용하여 안전한 인증 및 인가를 구현합니다.', checked: false },
								{ text: '폴리글랏 언어: 다양한 언어를 선택하여 각 마이크로서비스에 가장 적합한 언어를 사용합니다. 이를 통해 개발자들은 자신이 가장 잘 알고 있는 언어로 서비스를 개발할 수 있으며, 시스템 전체의 다양성과 유연성을 높일 수 있습니다.', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'UI/UX: Client Side Rendering (CSR) + MVVM: 클라이언트에서 페이지 렌더링 및 상태 관리를 담당하는 MVVM(Model-View-ViewModel) 아키텍처를 사용합니다. 이를 통해 사용자 경험을 향상시키고 복잡한 상태 관리를 용이하게 합니다.', checked: false },
								{ text: 'Token-based 보안, OAuth2: Level 3과 동일하게 토큰 기반의 보안 메커니즘을 사용합니다.', checked: false },
								{ text: '폴리글랏 언어 + Service Mesh: 다양한 언어를 사용하며, 마이크로서비스 간 통신과 네트워크 기능을 관리하기 위해 Service Mesh를 도입합니다. Service Mesh는 서비스 간의 통신, 로드 밸런싱, 모니터링 등을 추상화하여 관리합니다. 이를 통해 시스템의 확장성과 안정성을 향상시킬 수 있습니다.', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					name: '인프라 아키텍처 관점',
					name_en: 'infra-architecture',
					goalLevel: 0,
					levels: [
						{
							checkpoints: [
								{ text: '지속적인 빌드와 지속적인 통합 운영을 수행하고 있는가?', checked: false },
								{ text: '개발 및 운영 사이의 원활한 협업을 위한 도구와 프로세스를 도입하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '지속적인 딜리버리와 배포를 수행하고 있는가?', checked: false },
								{ text: '로그를 중앙 집중화하여 모니터링과 분석을 용이하게 하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '컨테이너 사용 (도커)을 적용하였는가?', checked: false },
								{ text: '컨테이너 오케스트레이터 (Kubernetes)를 사용하여 마이크로서비스를 관리하고 스케일링하였는가?', checked: false },
								{ text: '외부 구성 요소 (예: 유레카, 주키퍼)를 활용하여 마이크로서비스 간의 통신과 구성 관리를 개선했는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '자동 프로비저닝을 갖춘 PaaS(Pass-as-a-Service) 기반 솔루션을 사용하였는가?', checked: false },
								{ text: '인프라 자원의 프로비저닝, 확장 및 관리를 자동화하고 스케일링 용이성을 향상시켰는가?', checked: false },
								{ text: 'PaaS를 통해 개발팀은 인프라 구성과 관리에 대해 걱정하지 않고 비즈니스 로직에 집중할 수 있는 환경을 제공받았는가?', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					name: '배포 관점',
					name_en: 'distribute',
					goalLevel: 0,
					levels: [
						{
							checkpoints: [
								{ text: '설치 스크립트 구동 및 호스트 당 멀티 서비스 인스턴스를 적용하였는가?', checked: false },
								{ text: '설치 스크립트: 서비스 인스턴스를 설치하고 구성하기 위한 자동화된 스크립트를 사용하였는가?', checked: false },
								{ text: '호스트 당 멀티 서비스 인스턴스: 단일 호스트에서 여러 개의 서비스 인스턴스를 실행하여 확장성을 향상시켰는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'VM 당 하나의 서비스 인스턴스, 클라이언트 사이드 로드 밸런싱, 서버 사이드 로드 밸런싱을 적용하였는가?', checked: false },
								{ text: 'VM 당 하나의 서비스 인스턴스: 가상 머신(VM) 당 하나의 서비스 인스턴스를 실행하여 격리와 확장성을 개선했는가?', checked: false },
								{ text: '클라이언트 사이드 로드 밸런싱: 클라이언트 측에서 요청을 여러 서비스 인스턴스로 분산시키는 로드 밸런싱을 구현하였는가?', checked: false },
								{ text: '서버 사이드 로드 밸런싱: 로드 밸런서를 사용하여 서비스 인스턴스 간에 요청을 분산시키는 로드 밸런싱을 구현하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'Immutable 서버, 컨테이너 당 하나의 서비스 인스턴스, blue/green 배포를 포함한 다양한 배포 전략을 구사하였는가?', checked: false },
								{ text: 'Immutable 서버: 변경 불가능한 서버 이미지를 사용하여 배포와 롤백의 안정성과 일관성을 확보하였는가?', checked: false },
								{ text: '컨테이너 당 하나의 서비스 인스턴스: 컨테이너 당 하나의 서비스 인스턴스를 실행하여 격리와 확장성을 개선했는가?', checked: false },
								{ text: 'Blue/Green 배포: 새로운 버전의 서비스를 기존 버전과 동시에 배포하고 트래픽을 전환하는 Blue/Green 배포 전략을 구현하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '멀티 클라우드 및 멀티 데이터 센터 지원을 포함한 배포 관점의 성숙도를 갖췄는가?', checked: false },
								{ text: '멀티 클라우드: 여러 클라우드 제공업체를 사용하여 애플리케이션을 배포 및 실행하는 환경을 구축하였는가?', checked: false },
								{ text: '멀티 데이터 센터: 여러 데이터 센터에 애플리케이션을 분산 배포하여 가용성과 복원력을 향상시켰는가?', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					name: '팀 구조와 문화 관점',
					name_en: 'team-structure',
					goalLevel: 0,
					levels: [
						{
							checkpoints: [
								{ text: '개발, QA, 릴리즈, 운영이 분리된 하나의 기능 팀을 적용하였는가?', checked: false },
								{ text: '개발, QA, 릴리즈, 운영이 분리된 하나의 기능 팀: 기능별로 분리된 팀이 각자의 역할에 집중하여 작업하고, 개발부터 운영까지 전체 생명주기를 담당하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '공유된 서비스 모델로 팀 공동 작업, 내부 소스 공개를 적용하였는가?', checked: false },
								{ text: '공유된 서비스 모델: 여러 팀이 공통적으로 사용하는 서비스 모델을 개발하고 유지보수하여 효율성을 향상시켰는가?', checked: false },
								{ text: '팀 공동 작업: 여러 팀이 협업하여 기능을 개발하고 통합하는 작업을 수행하였는가?', checked: false },
								{ text: '내부 소스 공개: 팀 내에서 개발된 소스 코드와 지식을 공유하고 문서화하여 효율적인 협업을 도모하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '서비스별 프로덕트 팀(PO, UI/UX 디자이너, 개발자) Cross Functional한 플랫폼 팀을 적용하였는가?', checked: false },
								{ text: '서비스별 프로덕트 팀: 각 서비스에 대한 전체적인 책임을 갖는 프로덕트 팀을 구성하였는가?', checked: false },
								{ text: 'PO, UI/UX 디자이너, 개발자: 다양한 역할을 수행하는 멤버들로 구성되어 프로덕트를 개발하고 개선하는데 참여하였는가?', checked: false },
								{ text: 'Cross Functional한 플랫폼 팀: 다양한 기술과 역할을 갖춘 팀이 플랫폼 관련 업무를 수행하고, 서비스 팀을 지원하였는가?', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '업무 기능별 혹은 도메인별 팀들이 모든 관점에서 책임을 수반하였으며, "네가 구축한 것은 네가 운영합니다"를 적용하였는가?', checked: false },
								{ text: '업무 기능별 혹은 도메인별 팀: 특정 업무 기능이나 도메인을 담당하는 팀이 모든 측면에서 책임을 진다.', checked: false },
								{ text: '"네가 구축한 것은 네가 운영합니다": 각 팀이 자체적으로 구축한 서비스나 기능을 직접 운영하고 유지보수하는 책임을 가지며, 자율성을 강조하였는가?', checked: false },
							],
							isCompleted: false,
						},
					],
				},
			],
			chartWidth: 500,
			chartHeight: 500,
			chartCenterX: 250,
			chartCenterY: 250,
			chartRadius: 150,
			labelOffset: 20,
			maxDataValue: 5,
			pointRadius: 4,
        };
    },
};
