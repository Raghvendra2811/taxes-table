import { Grid, Skeleton } from '@mui/material'
import React from 'react'
import { columns, styles } from './utils'

const SkeletonComp = () => {
  return (
   <>
        <Grid container>
          {columns.map((column, idx) => (
            <Grid
              key={idx}
              px={1.5}
              py={2}
              item
              size={column.xsValue}
              sx={{
                borderBottom: "1px solid #B8B5C2",
              }}
            >
              <Skeleton variant="text" width={80} height={24} />
            </Grid>
          ))}
        </Grid>
        <Grid style={{ height: "calc(100% - 57px)" }}>
          {[...Array(10)].map((_, rowIdx) => (
            <Grid key={rowIdx} container>
              {columns.map((column, colIdx) => (
                <Grid
                  key={colIdx}
                  p={2}
                  item
                  size={column.xsValue}
                  style={styles.compColumnStyle}
                >
                  <Skeleton variant="rectangular" width="100%" height={32} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </>
  )
}

export default SkeletonComp
