import { Pipe, PipeTransform } from '@angular/core';

/**
 * 風向き[degree]を文字列に変換するPipe
 * @param degree 風向き（°）
 * @returns 風向き（１６方位）
 */
@Pipe({
  name: 'windDirection',
})
export class WindDirectionPipe implements PipeTransform {
  transform(degree: number): string {
    const directions = [
      '北',
      '北北東',
      '北東',
      '東北東',
      '東',
      '東南東',
      '南東',
      '南南東',
      '南',
      '南南西',
      '南西',
      '西南西',
      '西',
      '西北西',
      '北西',
      '北北西',
      '北',
    ];
    const dindex = Math.round(degree / 22.5);
    return directions[dindex];
  }
}
