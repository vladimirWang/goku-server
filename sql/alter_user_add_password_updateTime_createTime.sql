-- 加列password， 非空
ALTER TABLE user ADD column `password` varchar(50) not null;

-- 加列createTime, 默认值
ALTER TABLE user ADD COLUMN `createTime3` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- 加列updateTime，默认值
ALTER TABLE user ADD COLUMN `updateTime3` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6);