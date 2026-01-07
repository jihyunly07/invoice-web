#!/bin/bash

# Stop Hook - Claude 작업 완료 시 Slack 알림
# Claude Code가 작업을 완료했을 때 실행됩니다

set -e

# stdin에서 JSON 데이터 읽기
input=$(cat)

# jq로 JSON 파싱
session_id=$(echo "$input" | jq -r '.session_id // "unknown"')

# 프로젝트 경로
project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
project_name=$(basename "$project_dir")

# 타임스탬프
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Slack 메시지 구성
title="✅ 작업 완료"
slack_message="Claude Code가 작업을 완료했습니다.\n*프로젝트:* ${project_name}\n*세션 ID:* ${session_id}\n*시간:* ${timestamp}"

# Slack 알림 전송
source "${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/slack-notifier.sh"
send_slack_message "$title" "$slack_message"
