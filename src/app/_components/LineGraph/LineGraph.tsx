'use client';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type LineGraphProps = {
  width?: number;
  height?: number;
};

export const LineGraph: React.FC<LineGraphProps> = ({ width = 640, height = 320 }) => {
  const ref = useRef<SVGSVGElement>(null);
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const x = d3.scaleLinear().domain([-30, 0]).range([0, innerWidth]);
  // console.log('x:', x(0));

  const y = d3.scaleLinear().domain([-180, 180]).range([innerHeight, 0]);
  // console.log('y:', y(0));

  useEffect(() => {
    const target = d3.select(ref.current);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    target
      .append('g')
      .attr('transform', `translate(${margin.left + 15},${height - margin.bottom})`)
      .call(xAxis);
    target
      .append('g')
      .attr('transform', `translate(${margin.left + 15},${margin.bottom})`)
      .call(yAxis);
    return () => {
      target.selectAll('g').remove();
    };
  }, [width, height, margin.left, margin.bottom, x, y]);

  return <svg ref={ref} width={width} height={height}></svg>;
};
