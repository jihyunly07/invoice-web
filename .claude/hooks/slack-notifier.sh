#!/bin/bash

# Slack 알림 전송 공통 함수
# 사용법: send_slack_message "메시지 제목" "메시지 내용"

send_slack_message() {
  local title="$1"
  local message="$2"

  # 환경변수 로드
  if [ -f "${CLAUDE_PROJECT_DIR:-.}/.env.local" ]; then
    export $(grep -v '^#' "${CLAUDE_PROJECT_DIR:-.}/.env.local" | grep -v '^$' | xargs)
  fi

  # Webhook URL 확인
  if [ -z "$SLACK_WEBHOOK_URL" ]; then
    # 조용히 실패 (알림 없어도 작업은 계속)
    exit 0
  fi

  # Webhook URL 검증
  if [[ ! "$SLACK_WEBHOOK_URL" =~ ^https://hooks\.slack\.com ]]; then
    echo "Error: Invalid Slack Webhook URL" >&2
    exit 0
  fi

  # JSON 페이로드 생성
  local payload=$(cat <<EOF
{
  "text": "*${title}*\n\n${message}"
}
EOF
)

  # Slack API 호출
  curl -X POST "$SLACK_WEBHOOK_URL" \
    -H 'Content-Type: application/json' \
    -d "$payload" \
    --silent \
    --max-time 5 \
    2>&1 >/dev/null

  # 성공/실패 관계없이 exit 0 (알림 실패해도 작업은 계속)
  exit 0
}

# 스크립트가 직접 실행되면 인자를 받아서 전송
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
  send_slack_message "$1" "$2"
fi
