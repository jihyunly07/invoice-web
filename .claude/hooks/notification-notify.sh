#!/bin/bash

# Notification Hook - Claude 알림 발송 시 Slack으로 전달
# Claude Code가 사용자에게 알림을 보낼 때 실행됩니다

set -e

# stdin에서 JSON 데이터 읽기
input=$(cat)

# jq로 JSON 파싱
notification_message=$(echo "$input" | jq -r '.message // "알림"')
notification_type=$(echo "$input" | jq -r '.notification_type // "info"')

# 알림 타입에 따른 이모지
case "$notification_type" in
  "success")
    icon="✅"
    ;;
  "error")
    icon="❌"
    ;;
  "warning")
    icon="⚠️"
    ;;
  "permission_prompt")
    icon="🔐"
    ;;
  *)
    icon="🔔"
    ;;
esac

# 프로젝트 경로
project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
project_name=$(basename "$project_dir")

# 타임스탬프
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Slack 메시지 구성
title="${icon} Claude 알림"
slack_message="*타입:* ${notification_type}\n*메시지:* ${notification_message}\n*프로젝트:* ${project_name}\n*시간:* ${timestamp}"

# Slack 알림 전송
source "${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/slack-notifier.sh"
send_slack_message "$title" "$slack_message"
