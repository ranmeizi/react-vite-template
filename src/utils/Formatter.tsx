export function sex(text: string, record: any) {
  switch (record.sex) {
    case "1":
      return "男";
    case "2":
      return "女";
    default:
      return "未知";
  }
}

export function enabled(text: string, record: any) {
  return record.enabled ? "启用" : "禁用";
}
