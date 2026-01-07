#!/bin/bash

# PermissionRequest Hook - 권한 요청 시 Slack 알림
# Claude Code가 도구 사용 권한을 요청할 때 실행됩니다

set -e

# stdin에서 JSON 데이터 읽기
input=$(cat)

# jq로 JSON 파싱
tool_name=$(echo "$input" | jq -r '.tool_name // "알 수 없음"')
message=$(echo "$input" | jq -r '.message // "권한 요청"')

# tool_input 추출 (도구에 따라 다름)
if [ "$tool_name" = "Bash" ]; then
  tool_input=$(echo "$input" | jq -r '.tool_input.command // "명령어 없음"')
  detail="명령어: \`${tool_input}\`"
elif [[ "$tool_name" =~ ^(Write|Edit)$ ]]; then
  file_path=$(echo "$input" | jq -r '.tool_input.file_path // "파일 없음"')
  detail="파일: \`${file_path}\`"
else
  detail="도구 입력: $(echo "$input" | jq -c '.tool_input // {}')"
fi

# 프로젝트 경로
project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
project_name=$(basename "$project_dir")

# 타임스탬프
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Slack 메시지 구성
title="🔐 권한 요청"
slack_message="*도구:* ${tool_name}\n${detail}\n*프로젝트:* ${project_name}\n*시간:* ${timestamp}"

# Slack 알림 전송
source "${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/slack-notifier.sh"
send_slack_message "$title" "$slack_message"
