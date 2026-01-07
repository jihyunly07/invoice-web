# Slack Webhook URL 설정 가이드

**대상:** Slack 초보자부터 경험자까지
**소요 시간:** 약 10-15분
**난이도:** ⭐ 초급
**마지막 업데이트:** 2026-01-02

---

## 목차

1. [개요](#1-개요)
2. [사전 준비사항](#2-사전-준비사항)
3. [Slack 워크스페이스 생성](#3-slack-워크스페이스-생성)
4. [Slack 앱 생성](#4-slack-앱-생성)
5. [Incoming Webhooks 활성화](#5-incoming-webhooks-활성화)
6. [Webhook URL 복사](#6-webhook-url-복사)
7. [환경변수 설정](#7-환경변수-설정)
8. [설정 테스트](#8-설정-테스트)
9. [문제 해결](#9-문제-해결)
10. [보안 주의사항](#10-보안-주의사항)
11. [참고 자료](#11-참고-자료)

---

## 1. 개요

### Slack Webhook이란?

Slack Webhook은 외부 애플리케이션에서 Slack 채널로 메시지를 전송할 수 있게 해주는 간단한 HTTP 기반 API입니다. 코드를 통해 Slack에 자동 알림을 보낼 수 있어 다양한 업무 자동화에 활용됩니다.

### 이 프로젝트에서의 역할

이 Next.js 프로젝트에는 Claude Code와 Slack이 통합되어 있어, Claude Code가 작업하는 동안 실시간으로 Slack 알림을 받을 수 있습니다.

**받을 수 있는 알림 종류:**

- **🔐 권한 요청 알림**: Claude Code가 파일 수정, Bash 명령 실행 등의 권한을 요청할 때
- **🔔 일반 알림**: Claude Code가 작업 진행 상황이나 중요한 정보를 알릴 때
- **✅ 작업 완료 알림**: Claude Code가 요청한 작업을 완료했을 때

### 설정 후 기대 효과

- ✓ 컴퓨터 앞에 없어도 모바일로 Claude Code의 작업 진행 상황 확인
- ✓ 권한 요청 시 즉시 대응하여 작업 속도 향상
- ✓ 작업 완료 시점을 정확히 파악하여 다음 단계 진행 가능

---

## 2. 사전 준비사항

설정을 시작하기 전에 다음 사항을 확인하세요:

### ✓ Slack 계정

- Slack 계정이 있어야 합니다
- 계정이 없다면 [https://slack.com](https://slack.com)에서 무료로 생성할 수 있습니다

### ✓ Slack 앱 접근 권한

- Slack 데스크톱 앱 또는 웹 브라우저에서 Slack에 접근할 수 있어야 합니다
- 워크스페이스 관리자 권한이 있으면 좋지만, 일반 멤버도 앱을 생성할 수 있습니다

### ✓ 개발 환경

- 이 프로젝트가 로컬에 클론되어 있어야 합니다
- 텍스트 에디터(VS Code 등)가 설치되어 있어야 합니다

> **💡 팁:** 개인 개발용으로 사용한다면 새로운 워크스페이스를 만드는 것을 추천합니다. 회사 워크스페이스에서는 관리자 승인이 필요할 수 있습니다.

---

## 3. Slack 워크스페이스 생성

이미 Slack 워크스페이스가 있다면 이 섹션을 건너뛰고 [4. Slack 앱 생성](#4-slack-앱-생성)으로 이동하세요.

### 단계 1: Slack 웹사이트 방문

1. 브라우저에서 [https://slack.com](https://slack.com)을 엽니다
2. 우측 상단의 **"시작하기"** 또는 **"GET STARTED"** 버튼을 클릭합니다

### 단계 2: 워크스페이스 생성 시작

1. "Create a new workspace" 또는 "새 워크스페이스 만들기" 옵션을 선택합니다
2. 이메일 주소를 입력하고 **"Continue"** 버튼을 클릭합니다

### 단계 3: 이메일 인증

1. 입력한 이메일로 6자리 인증 코드가 전송됩니다
2. 이메일을 확인하고 인증 코드를 입력합니다
3. **"Create a Workspace"** 버튼을 클릭합니다

### 단계 4: 워크스페이스 정보 입력

1. **"What's the name of your company or team?"** 질문에 워크스페이스 이름을 입력합니다
   - 예: "개인 개발 workspace", "My Dev Workspace" 등
   - 개인 사용이라면 자유롭게 이름을 지어주세요

2. **"What's your team working on right now?"** 질문에는:
   - 건너뛰기(Skip)를 선택하거나
   - 간단히 "개인 개발 프로젝트" 등으로 입력해도 됩니다

### 단계 5: 팀원 초대 (선택사항)

1. "Who do you email most about [프로젝트명]?" 질문이 나타납니다
2. 개인 사용이라면 **"Skip this step"** 또는 **"건너뛰기"**를 클릭합니다

### 단계 6: 워크스페이스 완성

축하합니다! Slack 워크스페이스가 생성되었습니다. 이제 좌측 상단에서 워크스페이스 이름을 확인할 수 있습니다.

> **✓ 확인사항:** 워크스페이스 URL은 `your-workspace-name.slack.com` 형식입니다. 이 URL을 기억해두세요.

---

## 4. Slack 앱 생성

이제 Slack API 사이트에서 Claude Code와 연결할 앱을 생성합니다.

### 단계 1: Slack API 사이트 접속

1. 새 브라우저 탭에서 [https://api.slack.com/apps](https://api.slack.com/apps)를 엽니다
2. 아직 로그인하지 않았다면 Slack 계정으로 로그인합니다

### 단계 2: 새 앱 생성

1. 화면 우측 상단의 **"Create New App"** 또는 **"Create an App"** 버튼을 클릭합니다
2. 두 가지 옵션이 표시됩니다:
   - **"From scratch"** (처음부터 만들기) ← 이것을 선택하세요
   - "From an app manifest" (매니페스트에서 만들기)

### 단계 3: 앱 이름 및 워크스페이스 선택

팝업 창이 나타나면 다음 정보를 입력합니다:

1. **App Name (앱 이름)**:
   ```
   Claude Code Notifier
   ```
   - 또는 원하는 다른 이름을 입력해도 됩니다
   - 예: "개발 알림봇", "Claude Alerts" 등

2. **Pick a workspace to develop your app in (워크스페이스 선택)**:
   - 드롭다운 메뉴에서 앞서 생성한 워크스페이스를 선택합니다
   - 여러 워크스페이스가 있다면 올바른 것을 선택하세요

3. **"Create App"** 버튼을 클릭합니다

### 단계 4: 앱 설정 페이지 확인

앱이 생성되면 "Basic Information" 페이지로 이동합니다. 좌측에 다음과 같은 메뉴가 표시됩니다:

- Settings
  - Basic Information
  - Collaborators
  - Install App
- Features
  - **Incoming Webhooks** ← 다음 단계에서 사용
  - Slash Commands
  - Event Subscriptions
  - 기타 메뉴들...

> **✓ 확인사항:** 화면 상단에 앱 이름("Claude Code Notifier")이 표시되면 성공적으로 생성된 것입니다.

---

## 5. Incoming Webhooks 활성화

이제 Slack 앱에서 Incoming Webhooks 기능을 활성화하고 Webhook URL을 생성합니다.

### 단계 1: Incoming Webhooks 메뉴 열기

1. 좌측 메뉴에서 **"Features"** 섹션을 찾습니다
2. **"Incoming Webhooks"**를 클릭합니다

### 단계 2: Webhooks 활성화

1. 페이지 상단에 "Activate Incoming Webhooks" 섹션이 있습니다
2. 우측의 **토글 스위치**를 클릭하여 **"Off"**에서 **"On"**으로 변경합니다
3. 토글이 녹색으로 변하면 활성화된 것입니다

### 단계 3: Webhook URL 생성

1. 페이지를 아래로 스크롤하면 "Webhook URLs for Your Workspace" 섹션이 있습니다
2. **"Add New Webhook to Workspace"** 버튼을 클릭합니다

### 단계 4: 채널 선택 및 권한 승인

새 창 또는 페이지가 열리며 다음과 같은 화면이 나타납니다:

1. **"Where should Claude Code Notifier post?"** 질문이 표시됩니다

2. 드롭다운 메뉴에서 메시지를 받을 채널을 선택합니다:

   **추천 옵션:**
   - 전용 채널을 새로 만드는 것을 추천합니다
   - 드롭다운 하단의 **"Create a new channel"** 또는 직접 채널 생성 후 선택
   - 채널 이름 예: `#claude-notifications`, `#dev-alerts`

   **일반 옵션:**
   - `#general` - 기본 채널 (테스트용으로 괜찮음)
   - 기존의 다른 채널 선택 가능

3. **"Allow"** 또는 **"허용"** 버튼을 클릭합니다

### 단계 5: Webhook URL 생성 확인

권한을 승인하면 다시 Incoming Webhooks 페이지로 돌아옵니다. "Webhook URLs for Your Workspace" 섹션에 새로운 Webhook URL이 생성된 것을 확인할 수 있습니다.

```
Webhook URL
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

> **✓ 확인사항:** Webhook URL이 `https://hooks.slack.com/services/`로 시작하면 정상적으로 생성된 것입니다.

---

## 6. Webhook URL 복사

생성된 Webhook URL을 정확하게 복사하는 것이 중요합니다.

### 단계 1: Webhook URL 찾기

Incoming Webhooks 페이지의 "Webhook URLs for Your Workspace" 섹션에서:

1. 방금 생성한 Webhook URL을 찾습니다
2. URL 우측에 **"Copy"** 버튼이 있습니다

### 단계 2: URL 복사

**방법 1: Copy 버튼 사용 (권장)**
```
1. "Copy" 버튼을 클릭합니다
2. "Copied!" 메시지가 잠깐 표시되면 복사 완료
```

**방법 2: 수동 복사**
```
1. URL 전체를 마우스로 드래그하여 선택합니다
2. Ctrl+C (Windows/Linux) 또는 ⌘+C (Mac)를 눌러 복사합니다
```

### 단계 3: URL 구조 이해

복사한 URL은 다음과 같은 형식입니다:

```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

**각 부분의 의미:**
- `T00000000` - 워크스페이스 ID (T로 시작)
- `B00000000` - 앱 ID (B로 시작)
- `XXXXXXXXXXXXXXXXXXXX` - 고유 인증 토큰

> **⚠️ 중요:** 이 URL은 비밀번호와 같습니다. 누구나 이 URL을 알면 해당 Slack 채널에 메시지를 보낼 수 있으므로 절대 공개하지 마세요!

### 단계 4: 임시 저장 (선택사항)

다음 단계로 바로 진행할 예정이지만, 안전을 위해 URL을 임시로 메모장에 저장해두는 것도 좋습니다:

```
1. 메모장이나 텍스트 에디터를 엽니다
2. 복사한 URL을 붙여넣습니다
3. 설정이 완료되면 메모를 삭제합니다
```

---

## 7. 환경변수 설정

이제 복사한 Webhook URL을 프로젝트의 환경변수 파일에 설정합니다.

### 단계 1: .env.local 파일 열기

1. 텍스트 에디터(VS Code 등)에서 프로젝트를 엽니다
2. 프로젝트 루트 디렉토리에서 `.env.local` 파일을 찾습니다
3. 파일을 더블클릭하여 엽니다

> **💡 팁:** VS Code에서는 `Ctrl+P` (또는 ⌘+P)를 누르고 `.env.local`을 입력하면 빠르게 파일을 열 수 있습니다.

### 단계 2: 파일 내용 확인

`.env.local` 파일을 열면 다음과 같은 내용이 보입니다:

```bash
# Slack Webhook URL
# Slack API(https://api.slack.com/apps)에서 Incoming Webhook URL을 발급받아 아래에 입력하세요.
# 예: https://hooks.slack.com/services/YOUR_WORKSPACE_ID/YOUR_APP_ID/YOUR_TOKEN
# ⚠️ 보안: 이 파일은 .gitignore에 포함되어 있어 Git에 커밋되지 않습니다.

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 단계 3: Webhook URL 교체

8번 라인의 `SLACK_WEBHOOK_URL` 값을 수정합니다:

**변경 전:**
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**변경 후:**
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

> **⚠️ 주의사항:**
> - `SLACK_WEBHOOK_URL=` 부분은 그대로 두고, 그 뒤의 URL만 교체하세요
> - URL 앞뒤에 공백이 없는지 확인하세요
> - 따옴표(`"` 또는 `'`)를 추가하지 마세요
> - 줄바꿈이 없는지 확인하세요

### 단계 4: 파일 저장

1. `Ctrl+S` (Windows/Linux) 또는 `⌘+S` (Mac)를 눌러 파일을 저장합니다
2. VS Code 탭의 점(●)이 사라지면 저장된 것입니다

### 단계 5: 설정 확인

최종적으로 `.env.local` 파일은 다음과 같이 보여야 합니다:

```bash
# Slack Webhook URL
# Slack API(https://api.slack.com/apps)에서 Incoming Webhook URL을 발급받아 아래에 입력하세요.
# 예: https://hooks.slack.com/services/YOUR_WORKSPACE_ID/YOUR_APP_ID/YOUR_TOKEN
# ⚠️ 보안: 이 파일은 .gitignore에 포함되어 있어 Git에 커밋되지 않습니다.

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/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m3n4o5p6
```
(위 URL은 예시이며, 실제로는 여러분이 복사한 URL이 입력됩니다)

---

## 8. 설정 테스트

설정이 올바르게 되었는지 테스트해봅시다.

### 방법 1: 직접 테스트 스크립트 실행

프로젝트에 포함된 테스트 함수를 사용하여 Slack 알림을 직접 전송해볼 수 있습니다.

#### 단계 1: 터미널 열기

1. VS Code에서 `` Ctrl+` `` (백틱) 또는 상단 메뉴의 `View > Terminal`을 클릭합니다
2. 또는 시스템 터미널을 열고 프로젝트 디렉토리로 이동합니다

#### 단계 2: 테스트 명령 실행

터미널에서 다음 명령을 **한 줄씩** 입력합니다:

```bash
source .env.local
```

```bash
source .claude/hooks/slack-notifier.sh
```

```bash
send_slack_message "테스트" "Slack Webhook이 정상 작동합니다! 🎉"
```

#### 단계 3: Slack에서 확인

1. Slack 앱(모바일 또는 데스크톱)을 엽니다
2. Webhook을 설정한 채널로 이동합니다 (예: `#claude-notifications`)
3. 다음과 같은 메시지가 도착했는지 확인합니다:

```
Claude Code Notifier  APP  오후 2:30
*테스트*

Slack Webhook이 정상 작동합니다! 🎉
```

### 방법 2: Claude Code 사용 중 자동 알림 확인

실제로 Claude Code를 사용하면서 알림이 오는지 확인할 수도 있습니다:

1. Claude Code에서 작업을 수행합니다
2. Claude Code가 권한을 요청하거나 작업을 완료할 때 Slack으로 알림이 전송됩니다

#### 예상되는 알림 종류:

**🔐 권한 요청 알림:**
```
Claude Code Notifier  APP  오후 2:35
*🔐 권한 요청*

도구: Bash
명령어: `npm run build`
프로젝트: claude-nextjs-starters
시간: 2026-01-02 14:35:12
```

**✅ 작업 완료 알림:**
```
Claude Code Notifier  APP  오후 2:40
*✅ 작업 완료*

Claude Code가 작업을 완료했습니다.
프로젝트: claude-nextjs-starters
세션 ID: abc123
시간: 2026-01-02 14:40:25
```

### 성공 확인 체크리스트

- ✓ Slack 채널에 메시지가 도착했나요?
- ✓ 메시지 발신자가 "Claude Code Notifier" (또는 여러분이 설정한 앱 이름)인가요?
- ✓ 메시지 내용이 올바르게 표시되나요?
- ✓ 이모지가 정상적으로 표시되나요?

모두 체크되었다면 축하합니다! 설정이 완료되었습니다.

---

## 9. 문제 해결

설정 중 문제가 발생했나요? 아래에서 해결 방법을 찾아보세요.

### 문제 1: "Invalid Slack Webhook URL" 에러

**증상:**
```
Error: Invalid Slack Webhook URL
```

**원인:**
- Webhook URL이 올바르게 복사되지 않았거나 형식이 잘못됨

**해결 방법:**

1. **URL 전체 복사 확인**
   - `.env.local` 파일을 열고 URL이 완전한지 확인
   - `https://hooks.slack.com/services/T.../B.../...` 형식이어야 함

2. **공백 제거**
   ```bash
   # 잘못된 예 (앞뒤 공백 있음)
   SLACK_WEBHOOK_URL= https://hooks.slack.com/services/...

   # 올바른 예
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   ```

3. **URL 시작 부분 확인**
   - 반드시 `https://hooks.slack.com`으로 시작해야 함
   - `http://` (s 없음)로 시작하면 안 됨

4. **줄바꿈 확인**
   - URL이 두 줄로 나뉘어 있지 않은지 확인
   - URL 전체가 한 줄에 있어야 함

5. **재발급**
   - 위 방법으로 해결되지 않으면 Slack API 사이트에서 Webhook을 새로 생성하세요

---

### 문제 2: "Webhook 생성 버튼이 보이지 않음"

**증상:**
- "Add New Webhook to Workspace" 버튼이 표시되지 않음

**원인:**
- Incoming Webhooks 기능이 활성화되지 않음

**해결 방법:**

1. Incoming Webhooks 페이지 상단의 토글 스위치 확인
2. 토글이 **"On"** (녹색)으로 되어 있는지 확인
3. "Off"로 되어 있다면 클릭하여 "On"으로 변경
4. 페이지를 새로고침 (F5 또는 ⌘+R)
5. 페이지 하단으로 스크롤하여 "Add New Webhook to Workspace" 버튼 확인

---

### 문제 3: "권한 부족" 또는 "Permission Denied" 에러

**증상:**
```
You don't have permission to install apps
```

**원인:**
- 워크스페이스 관리자 권한이 부족함

**해결 방법:**

1. **워크스페이스 소유자에게 문의**
   - 회사 워크스페이스를 사용 중이라면 관리자에게 앱 생성 권한 요청

2. **개인 워크스페이스 생성**
   - [3. Slack 워크스페이스 생성](#3-slack-워크스페이스-생성)을 참고하여 새 워크스페이스 생성
   - 본인이 소유자인 워크스페이스에서는 모든 권한을 가짐

3. **워크스페이스 설정 확인**
   - 일부 워크스페이스는 앱 설치를 제한할 수 있음
   - 설정 > 권한 에서 "App 관리" 권한 확인

---

### 문제 4: "메시지가 Slack에 도착하지 않음"

**증상:**
- 테스트 스크립트를 실행했지만 Slack에 메시지가 나타나지 않음

**원인:**
- 환경변수 로드 실패
- Hook 설정 문제
- 네트워크 문제

**해결 방법:**

1. **환경변수 파일 위치 확인**
   ```bash
   # 프로젝트 루트에서 확인
   ls -la .env.local
   ```
   - 파일이 프로젝트 루트 디렉토리에 있어야 함

2. **환경변수 로드 확인**
   ```bash
   source .env.local
   echo $SLACK_WEBHOOK_URL
   ```
   - Webhook URL이 출력되어야 함
   - 아무것도 출력되지 않으면 `.env.local` 파일 내용 재확인

3. **Hook 설정 확인**
   - `.claude/settings.local.json` 파일 열기
   - `hooks` 섹션에 `PermissionRequest`, `Notification`, `Stop` 훅이 설정되어 있는지 확인

4. **네트워크 연결 확인**
   ```bash
   curl -I https://hooks.slack.com
   ```
   - `HTTP/2 200` 또는 `HTTP/2 302` 응답이 와야 함

5. **수동으로 메시지 전송 테스트**
   ```bash
   curl -X POST "$SLACK_WEBHOOK_URL" \
     -H 'Content-Type: application/json' \
     -d '{"text":"수동 테스트 메시지"}'
   ```
   - `ok` 응답이 오면 Webhook은 정상 작동하는 것

6. **Claude Code 재시작**
   - Claude Code 세션을 종료하고 다시 시작

---

### 문제 5: "curl: command not found" 에러

**증상:**
```
bash: curl: command not found
```

**원인:**
- curl 명령어가 시스템에 설치되지 않음 (macOS는 기본 제공)

**해결 방법:**

**macOS:**
```bash
# Homebrew가 설치되어 있다면
brew install curl
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install curl
```

**Linux (CentOS/RHEL):**
```bash
sudo yum install curl
```

---

### 문제 6: "jq: command not found" 에러

**증상:**
```
bash: jq: command not found
```

**원인:**
- jq JSON 파서가 시스템에 설치되지 않음

**해결 방법:**

**macOS:**
```bash
brew install jq
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install jq
```

**Linux (CentOS/RHEL):**
```bash
sudo yum install jq
```

---

### 문제 7: "Rate limit exceeded" 에러

**증상:**
```
Slack API rate limit exceeded
```

**원인:**
- 너무 많은 메시지를 짧은 시간에 전송함
- Slack 무료 요금제: 초당 1개 메시지 제한

**해결 방법:**

1. **알림 빈도 조절**
   - Hook 설정에서 불필요한 알림 비활성화
   - `.claude/settings.local.json`에서 특정 hook 제거 또는 주석 처리

2. **대기 시간 추가**
   - 여러 메시지를 연속으로 보내야 한다면 사이에 1초 대기 추가

3. **잠시 대기**
   - Rate limit은 일정 시간 후 자동으로 해제됨 (보통 1분)

---

### 문제 8: "메시지가 다른 채널로 전송됨"

**증상:**
- 의도한 채널이 아닌 다른 채널로 메시지가 도착함

**원인:**
- Webhook 생성 시 잘못된 채널을 선택함

**해결 방법:**

1. **새 Webhook 생성**
   - Slack API 사이트의 Incoming Webhooks 페이지로 이동
   - "Add New Webhook to Workspace" 버튼 클릭
   - 올바른 채널 선택
   - 새로운 Webhook URL 복사
   - `.env.local` 파일의 URL을 새 URL로 교체

2. **기존 Webhook 삭제 (선택사항)**
   - Incoming Webhooks 페이지에서 사용하지 않는 Webhook의 "Revoke" 버튼 클릭

---

## 10. 보안 주의사항

Webhook URL은 중요한 인증 정보입니다. 다음 보안 규칙을 반드시 지켜주세요.

### 🔒 규칙 1: Webhook URL 절대 공개 금지

**절대 하지 말아야 할 것:**

- ❌ GitHub, GitLab 등 공개 저장소에 `.env.local` 파일 커밋
- ❌ Webhook URL을 포럼, 블로그, SNS에 게시
- ❌ 스크린샷에 URL 노출
- ❌ 팀원에게 개인 Webhook URL 공유

**이유:**
- 누구나 Webhook URL을 알면 해당 Slack 채널에 무제한 메시지를 보낼 수 있음
- 스팸, 피싱, 악의적인 메시지 전송 가능

**올바른 방법:**
- 각 개발자가 개별적으로 Webhook을 생성
- 팀 프로젝트라면 `.env.example` 파일에 템플릿만 공유:
  ```bash
  # .env.example
  SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
  ```

### ✓ 규칙 2: .gitignore 설정 확인

**확인 방법:**

1. 프로젝트 루트의 `.gitignore` 파일을 엽니다
2. 다음 라인이 있는지 확인합니다:
   ```
   .env*
   ```
   또는
   ```
   .env.local
   ```

**이미 설정되어 있음:**
- 이 프로젝트는 `.env*` 패턴이 `.gitignore`에 포함되어 있습니다 (36번 라인)
- 따라서 `.env.local` 파일은 자동으로 Git에서 무시됩니다

**확인 방법:**
```bash
# Git 상태 확인
git status

# .env.local이 "Untracked files"에 나타나지 않아야 함
# "Changes not staged"에도 나타나지 않아야 함
```

### 🚨 규칙 3: URL 노출 시 즉시 조치

만약 실수로 Webhook URL을 공개했다면 **즉시** 다음 조치를 취하세요:

1. **Webhook 삭제**
   - [https://api.slack.com/apps](https://api.slack.com/apps) 접속
   - 해당 앱 선택
   - "Incoming Webhooks" 페이지로 이동
   - 노출된 Webhook의 **"Revoke"** 버튼 클릭

2. **새 Webhook 재발급**
   - "Add New Webhook to Workspace" 버튼 클릭
   - 동일한 채널 선택
   - 새로운 URL 복사

3. **환경변수 업데이트**
   - `.env.local` 파일의 `SLACK_WEBHOOK_URL` 값을 새 URL로 교체
   - 파일 저장

4. **Git 히스토리 정리 (필요 시)**
   - GitHub에 푸시된 경우 저장소를 private으로 변경하거나
   - Git 히스토리에서 URL을 완전히 제거 (고급 작업)

### 📋 규칙 4: Webhook 제한 사항 이해

**Webhook으로 할 수 있는 것:**
- ✓ 지정한 채널에 메시지 전송
- ✓ 간단한 마크다운 포맷 사용
- ✓ 이모지, 링크 포함

**Webhook으로 할 수 없는 것:**
- ✗ Slack 메시지 읽기
- ✗ 다른 채널로 메시지 전송 (생성 시 지정한 채널에만 가능)
- ✗ 파일 업로드
- ✗ 메시지 수정 또는 삭제

**Rate Limit:**
- 무료 요금제: 초당 1개 메시지
- 초과 시 일시적으로 차단됨

### 💾 규칙 5: .env.local 파일 백업

**백업 시 주의사항:**

- ✓ 암호화된 저장소에 백업 (1Password, LastPass 등)
- ✓ 로컬 암호화 폴더에 백업
- ✗ 클라우드 드라이브에 평문으로 백업 금지
- ✗ 이메일로 전송 금지

**권장 백업 방법:**

1. **비밀번호 관리자 사용**
   - 1Password, Bitwarden 등의 Secure Notes에 저장

2. **암호화된 파일로 저장**
   ```bash
   # macOS에서 암호화된 디스크 이미지 생성
   hdiutil create -encryption -size 10m -fs HFS+ -volname "Secrets" ~/Desktop/secrets.dmg
   ```

3. **팀 프로젝트의 경우**
   - HashiCorp Vault, AWS Secrets Manager 등 사용
   - `.env.example` 파일만 저장소에 커밋

---

## 11. 참고 자료

### 📚 공식 문서

**Slack 문서:**
- [Slack Incoming Webhooks 공식 가이드](https://api.slack.com/messaging/webhooks)
  - Webhook 기본 사용법, 메시지 포맷팅
- [Slack API 문서](https://api.slack.com)
  - Slack API 전체 문서
- [Slack 워크스페이스 생성 가이드](https://slack.com/help/articles/206845317-Create-a-Slack-workspace)
  - 워크스페이스 생성 공식 가이드
- [Slack 앱 관리](https://slack.com/help/articles/222386767-Manage-apps-for-your-workspace)
  - 앱 설치 및 관리 가이드

**Claude 문서:**
- [Claude Code 공식 문서](https://docs.anthropic.com/claude/docs/claude-code)
  - Claude Code CLI 사용법

### 📁 프로젝트 관련 문서

**이 프로젝트의 문서:**
- [`CLAUDE.md`](/CLAUDE.md) - 프로젝트 전체 가이드
  - 아키텍처, 코딩 규칙, 기술 스택 설명
- [`README.md`](/README.md) - 프로젝트 소개
  - 프로젝트 설치 및 실행 방법

**Hook 구현 파일:**
- [`.claude/hooks/slack-notifier.sh`](/.claude/hooks/slack-notifier.sh)
  - Slack 메시지 전송 공통 함수 구현
- [`.claude/hooks/permission-request-notify.sh`](/.claude/hooks/permission-request-notify.sh)
  - 권한 요청 알림 Hook
- [`.claude/hooks/notification-notify.sh`](/.claude/hooks/notification-notify.sh)
  - 일반 알림 Hook
- [`.claude/hooks/task-complete-notify.sh`](/.claude/hooks/task-complete-notify.sh)
  - 작업 완료 알림 Hook

**설정 파일:**
- [`.claude/settings.local.json`](/.claude/settings.local.json)
  - Claude Code Hook 설정

### 🌐 추가 리소스

**커뮤니티:**
- [Slack 커뮤니티](https://slackcommunity.com)
  - Slack 사용자 커뮤니티
- [Stack Overflow - Slack API 태그](https://stackoverflow.com/questions/tagged/slack-api)
  - Slack API 관련 질문과 답변

**도구:**
- [Webhook Tester](https://webhook.site)
  - Webhook 테스트 도구
- [Slack Message Builder](https://app.slack.com/block-kit-builder)
  - 복잡한 메시지 포맷 미리보기

### 💬 도움 받기

**문제가 해결되지 않나요?**

1. **프로젝트 이슈 등록**
   - GitHub 저장소의 Issues 탭에서 새 이슈 등록

2. **Slack API 지원**
   - [Slack API 커뮤니티](https://api.slack.com/community)에서 질문

3. **Claude Code 지원**
   - [Claude 지원 센터](https://support.anthropic.com)에 문의

---

## 축하합니다!

Slack Webhook URL 설정을 완료했습니다! 이제 Claude Code가 작업할 때마다 Slack으로 실시간 알림을 받을 수 있습니다.

**다음 단계:**

1. ✓ 실제로 Claude Code를 사용하면서 알림이 잘 오는지 확인하세요
2. ✓ 알림이 너무 많다면 `.claude/settings.local.json`에서 특정 hook을 비활성화할 수 있습니다
3. ✓ 다른 개발자도 사용한다면 이 가이드를 공유하세요 (Webhook URL은 공유하지 마세요!)

**피드백 환영:**
- 이 가이드가 도움이 되었나요?
- 개선할 점이 있다면 프로젝트 저장소에 이슈로 남겨주세요

즐거운 개발 되세요! 🚀
