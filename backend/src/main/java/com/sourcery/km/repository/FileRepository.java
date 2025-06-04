package com.sourcery.km.repository;

import com.sourcery.km.entity.File;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FileRepository {

    @Insert("""
            INSERT INTO files (id, file_type, created_at, created_by, is_temporary) VALUES
            (#{id}, #{fileType}, #{createdAt}, #{createdBy}, #{isTemporary})
            """)
    void insertNewFile(File file);

    @Update("""
            UPDATE files
            SET is_temporary = #{isTemporary}
            WHERE id = #{id}
            """)
    void updateFile(File file);
}
